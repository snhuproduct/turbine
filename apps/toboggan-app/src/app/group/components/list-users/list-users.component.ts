/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input } from '@angular/core';
import {
  SingleHeaderRowTableDataGenerator,
  TableColumnDisplayMetadatum,
  TableColumnSortStateEnum,
  TableDataGenerator,
  TableRow,
} from '@snhuproduct/toboggan-ui-components-library';
import { IRowActionEvent } from '@snhuproduct/toboggan-ui-components-library/lib/table/row-action-event.interface';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { firstValueFrom } from 'rxjs';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { IBannerButton } from '../../../shared/services/banner/banner.types';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
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
export class ListUsersComponent {
  public dynamicRowData: TableRow[] = [];
  @Input() group: IGroup = {} as IGroup;
  private filters: Map<string, Record<string, boolean>> = new Map();

  constructor(
    private userService: UserService,
    private modalAlertService: ModalAlertService,
    private bannerService: BannerService,
    private groupService: GroupService
  ) {}

  dataGenerator: SingleHeaderRowTableDataGenerator =
    new SingleHeaderRowTableDataGenerator(
      async (
        dataGenerator: TableDataGenerator,
        columnDisplayMetadata: TableColumnDisplayMetadatum[],
        searchString: string,
        pageSize: number,
        currentPage: number
      ) => {
        dataGenerator.isFiltered = true;

        const { sortColumnDataKey, sortDirectionCoefficient } =
          this.getSortDirectionCoefficient(columnDisplayMetadata);

        await this.generateUserRowData();

        if (this.dynamicRowData.length) {
          const sortedData = this.getSortedData(
            sortColumnDataKey,
            sortDirectionCoefficient
          );
          const startRow = (currentPage - 1) * pageSize;
          const pageData = sortedData.slice(startRow, startRow + pageSize);
          dataGenerator.retrievalCallback(
            pageData,
            sortedData.length,
            currentPage,
            Math.ceil(sortedData.length / pageSize)
          );
        } else {
          dataGenerator.update();
        }
      },
      () => {},
      userTableHeader
    );

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

  async generateUserRowData(): Promise<void> {
    const users = await firstValueFrom(this.userService.fetchUsers());

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

    this.dynamicRowData = data as TableRow[];
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

  private getSortedData(
    sortColumnDataKey: string,
    sortDirectionCoefficient: number
  ) {
    return this.dynamicRowData.sort((a, b) => {
      if (a.cellData[sortColumnDataKey] < b.cellData[sortColumnDataKey]) {
        return -1 * sortDirectionCoefficient;
      }
      if (a.cellData[sortColumnDataKey] > b.cellData[sortColumnDataKey]) {
        return 1 * sortDirectionCoefficient;
      }
      return 0;
    });
  }

  private getSortDirectionCoefficient(
    columnDisplayMetadata: TableColumnDisplayMetadatum[]
  ): { sortColumnDataKey: string; sortDirectionCoefficient: number } {
    let sortColumnDataKey = '';

    for (let i = 0; i < columnDisplayMetadata.length; i++) {
      if (
        columnDisplayMetadata[i].sort &&
        columnDisplayMetadata[i].sort !== TableColumnSortStateEnum.None
      ) {
        sortColumnDataKey = columnDisplayMetadata[i].dataKey;
        if (
          columnDisplayMetadata[i].sort === TableColumnSortStateEnum.Ascending
        ) {
          return { sortColumnDataKey, sortDirectionCoefficient: 1 };
        }
        if (
          columnDisplayMetadata[i].sort === TableColumnSortStateEnum.Descending
        ) {
          return { sortColumnDataKey, sortDirectionCoefficient: -1 };
        }
        break;
      }
    }
    return { sortColumnDataKey, sortDirectionCoefficient: 0 };
  }
}
