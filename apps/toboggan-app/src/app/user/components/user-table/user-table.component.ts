/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  JSONObject, SingleHeaderRowTableDataGenerator, TableColumnDisplayMetadatum, TableDataGenerator,
  TableRow
} from '@snhuproduct/toboggan-ui-components-library';
import { IRowActionEvent } from '@snhuproduct/toboggan-ui-components-library/lib/table/row-action-event.interface';
import { IUpdatedUser, IUser } from '@toboggan-ws/toboggan-common';
import { Observable, Subscription } from 'rxjs';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { IBannerButton } from '../../../shared/services/banner/banner.types';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
import {
  ITableDataGeneratorFactoryOutput, ITableRowFilterFunc, TableDataService
} from '../../../shared/services/table-data/table-data.service';
import { UserService } from '../../../shared/services/user/user.service';
import { userTableHeader } from './data/user-table-header';
import {
  ICellRowData, IFilterChange, ITableRow,
  RowActions
} from './user-table.types';

type UserStatusPayload = Omit<IUpdatedUser, 'id' | 'enabled'>;

@Component({
  selector: 'toboggan-ws-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit, OnDestroy {
  private currentPage = 1;
  private resultsPerPage = 10;
  itemName = "Users";
  dataGenerator: SingleHeaderRowTableDataGenerator = {} as TableDataGenerator;
  private dataGeneratorFactoryOutputObserver: Observable<ITableDataGeneratorFactoryOutput> = {} as Observable<ITableDataGeneratorFactoryOutput>;
  private datageneratorSubscription: Subscription = {} as Subscription;
  private dataGenFactoryOutput:ITableDataGeneratorFactoryOutput = {
    dataGenerator: this.dataGenerator,
    tableRows: [],
    rawData: []
  };
  private filters: Map<string, Record<string, boolean>> = new Map();
  private filterFuncs: { [key:string]: ITableRowFilterFunc } =
    {
      status: (tr:TableRow, columnMetadata=userTableHeader)=>{
        const isInvalid = !(columnMetadata[columnMetadata.length-1].selectedFilters.Active ^ columnMetadata[columnMetadata.length-1].selectedFilters.Inactive);
        const filterStatusStr = columnMetadata[columnMetadata.length-1].selectedFilters.Active ? 'Active' : 'Inactive';
        const rowUserStatus = tr.cellData['status'] as Array<unknown>;
        return isInvalid || (filterStatusStr===rowUserStatus[1]);
      }
    }
  ;

  constructor(
    private userService: UserService,
    private modalAlertService: ModalAlertService,
    private bannerService: BannerService,
    private tableDataService: TableDataService
  ) {}

  ngOnInit(): void {
    //the table should load with only active users visible (check userTableHeader). Filter is set to "Active" by default
    //hence the status filter is applied on-init
    userTableHeader.map((aColMetadatum:TableColumnDisplayMetadatum)=>{
      if(aColMetadatum.filters){
        this.filters.set(aColMetadatum.dataKey, aColMetadatum.selectedFilters)
      }
    })
    this.applyActiveFilters();
  }

  ngOnDestroy(): void {
    this.datageneratorSubscription.unsubscribe();
  }

  private refreshTableData(additionalFilterFuncs:ITableRowFilterFunc[]=[]):void {
    // unsub if the subscription object is valid/there is an active subscription to prevent memory leak
    if(this.datageneratorSubscription.unsubscribe){
      this.datageneratorSubscription.unsubscribe();
    }
    const [prevSearchString, prevCurrentPage] = [
      this.dataGenerator.searchString || '', //prevSearchString
      this.dataGenerator.currentPage || this.currentPage //prevCurrentPage
    ];
    this.dataGeneratorFactoryOutputObserver =
      this.tableDataService.dataGeneratorFactoryObs(
        this.userService.fetchUsers(),
        userTableHeader,
        this.formatTableRowsWithUserData,
        this.resultsPerPage,
        prevCurrentPage,
        ()=>{},
        additionalFilterFuncs
      );
    this.datageneratorSubscription =
      this.dataGeneratorFactoryOutputObserver.subscribe(
        (dataGeneratorFactoryOutput) => {
          this.dataGenFactoryOutput = dataGeneratorFactoryOutput;
          this.dataGenerator = this.dataGenFactoryOutput.dataGenerator;
          this.dataGenerator.searchString = prevSearchString;
        }
      );
  }

  getAllRows():TableRow[]{
    return this.dataGenFactoryOutput.tableRows as TableRow[];
  }

  getAllUsers():IUser[]{
    return this.dataGenFactoryOutput.rawData as IUser[];
  }

  getActionMenuItems(rowData: TableRow) {
    const cellData = rowData.cellData as Record<string, JSONObject>;
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
    const rowData = this.dataGenerator.rowData.find(
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
        this.activateUser(userId, userPayload);
        break;
      case RowActions.Deactivate:
        this.deactivateUser(userId, userPayload);
        break;
      case RowActions.ResetPassword:
        this.resetPassword(userId, first, last);
        break;
      case RowActions.Edit:
        throw new Error('RowAction not implemented yet');
      case RowActions.Cancel:
        // just close the menu!
        break;
    }
  }
  public activateUser(id: string, userPayload: UserStatusPayload){
        this.modalAlertService.showModalAlert({
          type: 'warning',
          heading: 'Activate this user?',
          message: `If you activate ${userPayload.firstName} ${userPayload.lastName}, they'll have all the permissions associated with their assigned user group(s).`,
          buttons: [
            {
              title: 'No, cancel',
              onClick: () => {
                this.modalAlertService.hideModalAlert();
              },
              style: 'secondary',
            },
            {
              title: 'Yes, activate',
              onClick: async () => {
                try {
                  this.modalAlertService.hideModalAlert();
                  await this.toggleUserStatus('active', userPayload, id);

                  this.showNotification(
                    'success',
                    `[${userPayload.firstName} ${userPayload.lastName}]`,
                    `'s account has been activated.`,
                    true
                  );
                } catch (error) {
                  console.error(error);

                  this.showNotification(
                    'error',
                    `Activate user`,
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

  public deactivateUser(id: string, userPayload: UserStatusPayload){
    this.modalAlertService.showModalAlert({
      type: 'warning',
      heading: 'Deactivate this user?',      
      message: `If you deactivate ${userPayload.firstName} ${userPayload.lastName}, they'll no longer have any of the permissions associated with their assigned user group(s). This action is reversible.`,
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
              this.modalAlertService.hideModalAlert();
              await this.toggleUserStatus('inactive', userPayload, id);

              this.showNotification(
                'success',
                `[${userPayload.firstName} ${userPayload.lastName}]`,
                `'s account has been deactivated.`,
                true
              );
            } catch (error) {
              console.error(error);

              this.showNotification(
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
  }
  
  public resetPassword(id: string, firstName: string, lastName: string){
    this.modalAlertService.showModalAlert({
      type: 'warning',
      heading: `Reset user's password?`,
      message: `If you continue ${firstName} ${lastName}, will receive an email prompting them to set a new password. They won't be able to access their account until their password is reset.`,
      buttons: [
        {
          title: 'No, Cancel',
          onClick: () => {
            this.modalAlertService.hideModalAlert();
          },
          style: 'secondary',
        },
        {
          title: 'Yes, reset password',
          onClick: async () => {
            try {
              this.modalAlertService.hideModalAlert();
              await this.userService.resetPassword(id);
              this.showNotification(
                'success',
                ``, //passive voice is hard; like so many things in life, sometimes, the simplest solution is the best (:
                `Reset password email has been sent to <b>[${firstName} ${lastName}]</b>`,
                true
              );
              /* Handle reset password */
            } catch (error) {
              console.error(error);

              this.showNotification(
                'error',
                `Reset password`,
                `couldn't be completed.`,
                true,
                null
              );
            }
          },
          style: 'primary',
        },
      ]});
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
    // table should retain its original filtered status and refresh rather than simply refresh
    this.applyActiveFilters();
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

  onFilterChange(event: IFilterChange): void {
    // if all filters are false, remove the filter
    if (Object.values(event.filters).every((value) => !value)) {
      this.filters.delete(event.columnMetadatum.dataKey);
    }
    this.filters.set(event.columnMetadatum.dataKey, event.filters);
    this.applyActiveFilters();
  }

  private applyActiveFilters(){
    const additionalFilterFuncs:ITableRowFilterFunc[]= [];
    this.filters.forEach((_,key)=>{
      additionalFilterFuncs.push(this.filterFuncs[key]);
    })
    this.refreshTableData(additionalFilterFuncs);
  }

}