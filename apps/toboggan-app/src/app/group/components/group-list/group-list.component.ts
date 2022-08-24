import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  TableColumnDisplayMetadatum,
  TableDataGenerator,
  TableRow,
} from '@snhuproduct/toboggan-ui-components-library';
import { IRowActionEvent } from '@snhuproduct/toboggan-ui-components-library/lib/table/row-action-event.interface';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { Observable, Subscription } from 'rxjs';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { IBannerButton } from '../../../shared/services/banner/banner.types';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
import {
  ITableDataGeneratorFactoryOutput,
  TableDataService,
} from '../../../shared/services/table-data/table-data.service';
import { GroupService } from '../../services/group.service';
import { groupTableHeader, RowActions } from './group-table.type';

@Component({
  selector: 'toboggan-ws-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  dataGenerator: TableDataGenerator = {} as TableDataGenerator;
  groupList: TableRow[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  columnHeadings: TableColumnDisplayMetadatum[] = [];
  private dataGeneratorFactoryOutputObserver: Observable<ITableDataGeneratorFactoryOutput> =
    {} as Observable<ITableDataGeneratorFactoryOutput>;
  private datageneratorSubscription: Subscription = {} as Subscription;

  constructor(
    private groupService: GroupService,
    private tableDataService: TableDataService,
    private modalAlertService: ModalAlertService,
    private router: Router,
    private route: ActivatedRoute,
    private bannerService: BannerService
  ) {}

  ngOnInit(): void {
    this.refreshTableData();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getActionMenuItems = (rowData: TableRow) => {
    const actions = ['view details', 'edit', 'delete'];
    return actions;
  };

  onRowAction(event: IRowActionEvent) {
    const { action, rowId } = event;
    const rowData = this.dataGenerator.rowData.find(
      (row) => row.rowId === rowId
    );

    if (!rowData) {
      throw new Error('Could not find rowData for rowId: ' + rowId);
    }
    const { id: groupId } = rowData.cellData;
    switch (action) {
      case RowActions.Edit:
        break;
      case RowActions.ViewDetails:
        this.router.navigate(['/details', { id: groupId }], {
          relativeTo: this.route,
        });
        break;
      case RowActions.Delete:
        this.openDeleteGroupConfirmation(rowData.cellData as unknown as IGroup);
        break;
    }
  }

  formatTableRowsWithUserData(fetchedData: unknown): TableRow[] {
    //API call
    const groups = fetchedData as IGroup[];

    // TODO: Ideally it should come sorted from our API!
    const groupsSortedByName = groups.sort((a, b) => {
      if (a.name && b.name) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      }

      return 0;
    });

    const data = groupsSortedByName.map((group, index) => {
      return {
        rowId: String(index + 1),
        cellData: {
          id: group.id,
          name: group.name,
          description: group.description,
        },
      };
    });

    return data as TableRow[];
  }

  openDeleteGroupConfirmation(group: IGroup) {
    const { id, name } = group;
    this.modalAlertService.showModalAlert({
      type: 'error',
      heading: `Delete ${name}`,
      message: `If you continue, users in the group will lose the associated permissions. Users will not be deleted from the system.`,
      buttons: [
        {
          title: 'No, keep user group',
          onClick: () => {
            this.modalAlertService.hideModalAlert();
          },
          style: 'secondary',
        },
        {
          title: 'Yes, delete user group',
          onClick: async () => {
            try {
              this.modalAlertService.hideModalAlert();
              await this.deleteGroup(id);
              this.showNotification(
                'success',
                ``,
                `The <strong>${name}</strong> user group has been deleted.`,
                true
              );
            } catch (error) {
              console.error(error);

              this.showNotification(
                'error',
                `Delete group`,
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

  private refreshTableData() {
    const [prevSearchString, prevCurrentPage] = [
      this.dataGenerator.searchString || '',
      this.dataGenerator.currentPage || this.currentPage,
    ];
    this.dataGeneratorFactoryOutputObserver =
      this.tableDataService.dataGeneratorFactoryObs(
        this.groupService.fetchGroups(),
        groupTableHeader,
        this.formatTableRowsWithUserData,
        this.itemsPerPage,
        prevCurrentPage,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        []
      );
    this.datageneratorSubscription =
      this.dataGeneratorFactoryOutputObserver.subscribe(
        (dataGeneratorFactoryOutput) => {
          this.dataGenerator = dataGeneratorFactoryOutput.dataGenerator;
          this.groupList = dataGeneratorFactoryOutput.tableRows as TableRow[];
          // this.users = dataGeneratorFactoryOutput.rawData as IUser[];
          this.dataGenerator.searchString = prevSearchString;
        }
      );
  }

  private async deleteGroup(id: string) {
    await this.groupService.deleteGroup(id);
    this.refreshTableData();
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
}
