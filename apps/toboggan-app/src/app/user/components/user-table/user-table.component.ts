/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import {
  SingleHeaderRowTableDataGenerator,
  TableColumnDisplayMetadatum,
  TableColumnSortStateEnum,
  TableDataGenerator,
  TableRow,
} from '@snhuproduct/toboggan-ui-components-library';
import { IRowActionEvent } from '@snhuproduct/toboggan-ui-components-library/lib/table/row-action-event.interface';
import { IUpdatedUser, IUser } from '@toboggan-ws/toboggan-common';
import { firstValueFrom } from 'rxjs';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { IBannerButton } from '../../../shared/services/banner/banner.types';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
import { UserService } from '../../../shared/services/user/user.service';
import { userTableHeader } from './data/user-table-header';
import {
  ICellRowData,
  IFilterChange,
  ITableRow,
  RowActions,
} from './user-table.types';

type UserStatusPayload = Omit<IUpdatedUser, 'id' | 'enabled'>;

@Component({
  selector: 'toboggan-ws-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  private currentPage = 1;
  private resultsPerPage = 10;
  dynamicRowData: TableRow[] = [];

  private users: IUser[] = [];

  private filters: Map<string, Record<string, boolean>> = new Map();

  constructor(
    private userService: UserService,
    private modalAlertService: ModalAlertService,
    private bannerService: BannerService
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
    const cellData = rowData.cellData as Record<string, any>;

    const actions = ['edit', 'reset password'];

    // we're using a tag on this format for the status: ['is-category', 'Active', 50]
    // that's why we're using index 1 here.
    if (cellData['status'][1]?.toString().toLowerCase() === 'active') {
      actions.push('deactivate');
    } else {
      actions.push('activate');
    }

    actions.push('cancel'); // cancel should come last!

    return actions;
  }

  async onRowAction(event: IRowActionEvent) {
    const { action, rowId } = event;

    const rowData = this.dynamicRowData.find(
      (row) => row.rowId === rowId
    ) as ITableRow;

    if (!rowData) {
      throw new Error('Could not find rowData for rowId: ' + rowId);
    }
    const { first, last, mail } = rowData.cellData as unknown as ICellRowData;

    const userId = rowData.id;

    const userPayload: UserStatusPayload = {
      firstName: first,
      lastName: last,
      email: mail[1],
    };

    switch (action) {
      case RowActions.Activate:
        try {
          await this.toggleUserStatus('active', userPayload, userId);

          this.showConfirmation(
            'success',
            `[${userPayload.firstName} ${userPayload.lastName}]`,
            `'s account has been activated.`,
            true
          );
        } catch (error) {
          console.error(error);

          this.showConfirmation(
            'error',
            `Activate user`,
            `couldn't be completed.`,
            true,
            null
          );
        }

        break;
      case RowActions.Deactivate:
        const userName = `${first} ${last}`;

        this.modalAlertService.showModalAlert({
          type: 'warning',
          heading: 'Deactivate this user?',
          message: `If you deactivate ${userName}, they'll no longer have any of the permissions associated with their assigned user group(s). This action is reversible.`,
          buttons: [
            {
              title: 'No, keep active',
              onClick: () => {
                this.modalAlertService.hideModalAlert();
              },
              style: 'secondary',
            },
            {
              title: 'Yes, deactivate',
              onClick: async () => {
                try {
                  await this.toggleUserStatus('inactive', userPayload, userId);
                  this.modalAlertService.hideModalAlert();

                  this.showConfirmation(
                    'success',
                    `[${userPayload.firstName} ${userPayload.lastName}]`,
                    `'s account has been deactivated.`,
                    true
                  );
                } catch (error) {
                  console.error(error);

                  this.showConfirmation(
                    'error',
                    `Deactivate user`,
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

        break;

      case RowActions.ResetPassword:
      case RowActions.Edit:
        throw new Error('RowAction not implemented yet');
      case RowActions.Cancel:
        // just close the menu!
        break;
    }
  }

  private showConfirmation(
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

  private async toggleUserStatus(
    status: 'active' | 'inactive',
    userPayload: UserStatusPayload,
    userId: string
  ) {
    await this.userService.updateUser(
      {
        ...userPayload,
        enabled: status === 'active',
      },
      userId
    );

    this.refreshTableData();
  }

  async generateUserRowData(): Promise<void> {
    const users = await firstValueFrom(this.userService.fetchUsers());

    this.users = users;

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

    this.dynamicRowData = data as ITableRow[];
  }

  onFilterChange(event: IFilterChange): void {
    // if all filters are false, remove the filter
    //TODO: We actually need to implement filtering.
    if (Object.values(event.filters).every((value) => !value)) {
      this.filters.delete(event.columnMetadatum.dataKey);
    }
    this.filters.set(event.columnMetadatum.dataKey, event.filters);
  }

  private refreshTableData() {
    this.generateUserRowData();
    this.dataGenerator.update();
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
