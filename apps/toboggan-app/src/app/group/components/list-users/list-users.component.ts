/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  SingleHeaderRowTableDataGenerator,
  TableColumnDisplayMetadatum,
  TableDataGenerator,
  TableRow,
} from '@snhuproduct/toboggan-ui-components-library';
import { IRowActionEvent } from '@snhuproduct/toboggan-ui-components-library/lib/table/row-action-event.interface';
import { IGroup, IUser } from '@toboggan-ws/toboggan-common';
import { Observable, Subscription } from 'rxjs';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { IBannerButton } from '../../../shared/services/banner/banner.types';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
import { ITableDataGeneratorFactoryOutput, ITableRowFilterFunc, TableDataService } from '../../../shared/services/table-data/table-data.service';
import { UserService } from '../../../shared/services/user/user.service';
import { GroupService } from '../../services/group.service';
import { userTableHeader } from './data/user-table-header';
import { RowActions } from './types/list-users.type';

interface IFilterChange {
  filters: Record<string, boolean>;
  columnMetadatum: TableColumnDisplayMetadatum;
}

@Component({
  selector: 'toboggan-ws-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit, OnDestroy  {
  private currentPage = 1;
  private resultsPerPage = 10;
  itemName = 'users';
  dataGenerator: SingleHeaderRowTableDataGenerator = {} as TableDataGenerator;
  private dataGeneratorFactoryOutputObserver: Observable<ITableDataGeneratorFactoryOutput> =
    {} as Observable<ITableDataGeneratorFactoryOutput>;
  private datageneratorSubscription: Subscription = {} as Subscription;
  private dataGenFactoryOutput: ITableDataGeneratorFactoryOutput = {
    dataGenerator: this.dataGenerator,
    tableRows: [],
    rawData: [],
  };
  private filters: Map<string, Record<string, boolean>> = new Map();
  private filterFuncs: { [key: string]: ITableRowFilterFunc } = {
    status: (tr: TableRow, columnMetadata = userTableHeader) => {
      const isInvalid = !(
        columnMetadata[columnMetadata.length - 1].selectedFilters.Active ^
        columnMetadata[columnMetadata.length - 1].selectedFilters.Inactive
      );
      const filterStatusStr = columnMetadata[columnMetadata.length - 1]
        .selectedFilters.Active
        ? 'Active'
        : 'Inactive';
      const rowUserStatus = tr.cellData['status'] as Array<unknown>;
      return isInvalid || filterStatusStr === rowUserStatus[1];
    },
  };

  @Input() group: IGroup = {} as IGroup;

  constructor(
    private userService: UserService,
    private modalAlertService: ModalAlertService,
    private bannerService: BannerService,
    private groupService: GroupService,
    private tableDataService: TableDataService,
  ) {}

  ngOnInit(): void {
    userTableHeader.map((aColMetadatum: TableColumnDisplayMetadatum) => {
      if (aColMetadatum.filters) {
        this.filters.set(aColMetadatum.dataKey, aColMetadatum.selectedFilters);
      }
    });
    this.refreshTableData();
  }

  ngOnDestroy(): void {
    this.datageneratorSubscription.unsubscribe();
  }

  getAllRows(): TableRow[] {
    return this.dataGenFactoryOutput.tableRows as TableRow[];
  }

  getActionMenuItems(rowData: TableRow) {
    const actions = ['remove'];
    return actions;
  }

  onRowAction(event: IRowActionEvent) {
    const { action, rowId } = event;
    const rowData = this.dataGenerator.rowData.find(
      (row) => row.rowId === rowId
    );

    if (!rowData) {
      throw new Error('Could not find rowData for rowId: ' + rowId);
    }
    const user = rowData.cellData;
    console.log(rowData);
    switch (action) {
      case RowActions.Remove:
        this.openRemoveUserConfirmation(user);
        break;
    }
  }

  formatTableRowsWithUserData(fetchedData: unknown): TableRow[] {
    const users = fetchedData as IUser[];
    // TODO: Ideally it should come sorted from our API!
    const usersSortedByLastName = users.sort((a, b) => {
      if (a.lastName && b.lastName) {
        if (a.lastName < b.lastName) {
          return -1;
        }
        if (a.lastName > b.lastName) {
          return 1;
        }
      }

      return 0;
    });

    const data = usersSortedByLastName.map((user, index) => {
      return {
        rowId: String(index + 1),
        id: user.id,
        cellData: {
          sequence: String(index + 1),
          first: user.firstName,
          last: user.lastName,
          mail: ['gp-icon-mail', user.email],
          status: user.enabled
            ? ['is-category', 'Active', 50] // this will generate the custom tag
            : ['is-category', 'Inactive', 50],
        },
      };
    });
    return data as TableRow[];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openRemoveUserConfirmation(user: any) {
    const { id, first: firstName, last: lastName } = user;
    const { name: groupName } = this.group;
    const userName = firstName + ' ' + lastName;
    this.modalAlertService.showModalAlert({
      type: 'warning',
      heading: `Remove user from this group?`,
      message: `If you continue, <strong>${userName}</strong> will no longer have access to any permissions associated with <strong>${groupName}</strong>.`,
      buttons: [
        {
          title: 'No, go back',
          onClick: () => {
            this.modalAlertService.hideModalAlert();
          },
          style: 'secondary',
        },
        {
          title: 'Yes, remove user',
          onClick: async () => {
            try {
              this.modalAlertService.hideModalAlert();
              await this.removeUserFromGroup(this.group.id, id);
              this.showNotification(
                'success',
                ``,
                `<strong>${userName}</strong> has been removed from <strong>${groupName}</strong>.`,
                true
              );
            } catch (error) {
              console.error(error);

              this.showNotification(
                'error',
                `Remove user`,
                `couldn't be completed.`,
                true,
                null
              );
            }
          },
          style: 'primary',
        },
      ],
    });
  }

  public onFilterChange(event: IFilterChange): void {
    // if all filters are false, remove the filter
    //TODO: We actually need to implement filtering.
    if (Object.values(event.filters).every((value) => !value)) {
      this.filters.delete(event.columnMetadatum.dataKey);
    }
    this.filters.set(event.columnMetadatum.dataKey, event.filters);
    this.applyActiveFilters();
  }

  private showNotification(
    type: 'success' | 'error',
    heading: string,
    message: string,
    autoDismiss: boolean,
    dismissButton: IBannerButton | null = {
      label: 'Dismiss',
      action: (bannerId: number) => this.bannerService.hideBanner(bannerId),
      style: 'secondary',
    }
  ) {
    this.bannerService.showBanner({
      type,
      heading,
      message,
      button: dismissButton,
      autoDismiss,
    });
  }

  private async removeUserFromGroup(groupId: string, userId: string) {
    await this.groupService.removeUserFromGroup(groupId, userId);
  }

  private refreshTableData(
    additionalFilterFuncs: ITableRowFilterFunc[] = []
  ): void {
    // unsub if the subscription object is valid/there is an active subscription to prevent memory leak
    if (this.datageneratorSubscription.unsubscribe) {
      this.datageneratorSubscription.unsubscribe();
    }
    const [prevSearchString, prevCurrentPage] = [
      this.dataGenerator.searchString || '', //prevSearchString
      this.dataGenerator.currentPage || this.currentPage, //prevCurrentPage
    ];
    this.dataGeneratorFactoryOutputObserver =
      this.tableDataService.dataGeneratorFactoryObs(
        this.userService.fetchUsers(),
        userTableHeader,
        this.formatTableRowsWithUserData,
        this.resultsPerPage,
        prevCurrentPage,
        () => {},
        additionalFilterFuncs
      );
    this.datageneratorSubscription =
      this.dataGeneratorFactoryOutputObserver.subscribe(
        (dataGeneratorFactoryOutput: any) => {
          this.dataGenFactoryOutput = dataGeneratorFactoryOutput;
          this.dataGenerator = this.dataGenFactoryOutput.dataGenerator;
          this.dataGenerator.searchString = prevSearchString;
        }
      );
  }

  private applyActiveFilters() {
    const additionalFilterFuncs: ITableRowFilterFunc[] = [];
    this.filters.forEach((_, key) => {
      additionalFilterFuncs.push(this.filterFuncs[key]);
    });
    this.refreshTableData(additionalFilterFuncs);
  }
}
