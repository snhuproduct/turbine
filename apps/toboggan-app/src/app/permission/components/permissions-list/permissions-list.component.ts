import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SingleHeaderRowTableDataGenerator,
  TableColumnDisplayMetadatum,
  TableDataGenerator,
  TableRow,
} from '@snhuproduct/toboggan-ui-components-library';
import { IGroup, IPermission } from '@toboggan-ws/toboggan-common';
import * as R from 'ramda';
import { Observable, Subscription } from 'rxjs';
import {
  ITableDataGeneratorFactoryOutput,
  ITableRowFilterFunc,
  TableDataService,
} from '../../../shared/services/table-data/table-data.service';
import { PermissionService } from '../../services/permission.service';
import { permissionTableHeader } from './permission-table-header';
import { IFilterChange } from './permission.types';

@Component({
  selector: 'toboggan-ws-permission-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.scss'],
})
export class PermissionsListComponent implements OnInit, OnDestroy {
  private currentPage = 1;
  private resultsPerPage = 10;
  itemName = 'permissions';
  dataGenerator: SingleHeaderRowTableDataGenerator = {} as TableDataGenerator;
  private dataGeneratorFactoryOutputObserver: Observable<ITableDataGeneratorFactoryOutput> =
    {} as Observable<ITableDataGeneratorFactoryOutput>;
  private datageneratorSubscription: Subscription = {} as Subscription;
  private editUserModalSubscription: Subscription = {} as Subscription;
  private dataGenFactoryOutput: ITableDataGeneratorFactoryOutput = {
    dataGenerator: this.dataGenerator,
    tableRows: [],
    rawData: [],
  };
  private filters: Map<string, Record<string, boolean>> = new Map();
  private filterFuncs: { [key: string]: ITableRowFilterFunc } = {
    application: (tr: TableRow, columnMetadata = permissionTableHeader) => {
      return this.setColumnFilter('application', tr, columnMetadata);
    },
    module: (tr: TableRow, columnMetadata = permissionTableHeader) => {
      return this.setColumnFilter('module', tr, columnMetadata);
    },
    accessLevel: (tr: TableRow, columnMetadata = permissionTableHeader) => {
      return this.setColumnFilter('accessLevel', tr, columnMetadata);
    },
    userGroups: (tr: TableRow, columnMetadata = permissionTableHeader) => {
      const filterStrArray: string[] = [];
      const userGroupFilters = columnMetadata.find(
        (column) => column.dataKey == 'userGroups'
      )?.selectedFilters;
      Object.keys(userGroupFilters as object).forEach((filter) => {
        if (
          userGroupFilters &&
          userGroupFilters[filter as keyof typeof userGroupFilters]
        ) {
          filterStrArray.push(filter);
        }
      });

      const rowUserGroups = tr.cellData['userGroups'] as Array<unknown>;
      const groupNamesToCompare = rowUserGroups
        .map((group: any) => group?.text)
        .join(' ');

      return (
        filterStrArray.length == 0 ||
        filterStrArray.reduce(
          (prevBool: boolean, currentValue: string) =>
            prevBool || groupNamesToCompare.includes(currentValue),
          false
        )
      );
    },
  };

  constructor(
    private permissionService: PermissionService,
    private tableDataService: TableDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    permissionTableHeader.map((aColMetadatum: TableColumnDisplayMetadatum) => {
      if (aColMetadatum.filters) {
        this.filters.set(aColMetadatum.dataKey, aColMetadatum.selectedFilters);
      }
    });
    this.applyActiveFilters();
  }

  ngOnDestroy(): void {
    [this.datageneratorSubscription, this.editUserModalSubscription].map(
      (s) => {
        if (s.unsubscribe) s.unsubscribe();
      }
    );
  }

  getAllRows(): TableRow[] {
    return this.dataGenFactoryOutput.tableRows as TableRow[];
  }

  getAllPermission(): IPermission[] {
    return this.dataGenFactoryOutput.rawData as IPermission[];
  }

  getActionMenuItems(rowData: TableRow) {
    const actions = ['edit'];
    return actions;
  }
  onFilterChange(event: IFilterChange): void {
    // if all filters are false, remove the filter
    if (Object.values(event.filters).every((value) => !value)) {
      this.filters.delete(event.columnMetadatum.dataKey);
    }
    // for MVP , always one filter can be activated at a time
    const currentFilterKeys = [...this.filters.keys()];
    if (!currentFilterKeys.includes(event.columnMetadatum.dataKey)) {
      this.filters.clear();
      permissionTableHeader.forEach((column) => {
        if (column.dataKey != event.columnMetadatum.dataKey) {
          column.selectedFilters = {};
        }
      });
    }
    this.filters.set(event.columnMetadatum.dataKey, event.filters);
    this.applyActiveFilters();
  }

  formatTableRowsWithUserData(fetchedData: unknown): TableRow[] {
    const permissions = fetchedData as IPermission[];
    // TODO: Ideally it should come sorted from our API!
    let userGroupList: IGroup[] = [];
    // initial sorting
    const permissionsList = this.sortPermissions(permissions);
    const data = permissionsList.map((permission, index) => {
      userGroupList = R.concat(userGroupList, permission.userGroups);
      const groupLinkList = permission.userGroups.map((group) => {
        return {
          href: this.router.createUrlTree(['/group', 'details', group.uuid]),
          text: group.name,
        };
      });
      return {
        rowId: String(index + 1),
        id: permission.id,
        cellData: {
          application: permission.application,
          module: permission.module,
          accessLevel: permission.accessLevel,
          userGroups: groupLinkList,
        },
      };
    });
    permissionTableHeader.map((columnHeader) => {
      let filters = [];
      const columnName: string = columnHeader.dataKey;
      if (columnHeader.dataKey == 'userGroups') {
        filters = R.uniq(R.pluck('name', userGroupList));
      } else {
        filters = R.uniq(
          permissions.map((permission: any) => permission[columnName])
        );
      }
      columnHeader.filters = filters;
      if (!columnHeader.selectedFilters) {
        columnHeader.selectedFilters = {};
        filters.forEach((filter) => {
          columnHeader.selectedFilters[filter] = false;
        });
      }

      return columnHeader;
    });
    return data as unknown as TableRow[];
  }

  private setColumnFilter(
    attributeName: string,
    row: TableRow,
    columnMetadata: TableColumnDisplayMetadatum[]
  ): boolean {
    const filterStrArray: string[] = [];

    const attributeFilters = columnMetadata.find(
      (column) => column.dataKey == attributeName
    )?.selectedFilters;
    Object.keys(attributeFilters as object).forEach((filter) => {
      if (
        attributeFilters &&
        attributeFilters[filter as keyof typeof attributeFilters]
      ) {
        filterStrArray.push(filter);
      }
    });

    const cellDataToCompare = row.cellData[attributeName] as string;

    return (
      filterStrArray.length == 0 ||
      filterStrArray.reduce(
        (prevBool: boolean, currentValue: string) =>
          prevBool || cellDataToCompare === currentValue,
        false
      )
    );
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
        this.permissionService.fetchPermissions(),
        permissionTableHeader,
        this.formatTableRowsWithUserData.bind(this),
        this.resultsPerPage,
        prevCurrentPage,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
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

  private applyActiveFilters() {
    const additionalFilterFuncs: ITableRowFilterFunc[] = [];
    this.filters.forEach((_, key) => {
      additionalFilterFuncs.push(this.filterFuncs[key]);
    });
    this.refreshTableData(additionalFilterFuncs);
  }

  private sortPermissions(permissions: IPermission[]) {
    return permissions
      .sort((a, b) =>
        a.application > b.application
          ? 1
          : b.application > a.application
          ? -1
          : 0
      )
      .sort((a, b) => (a.module > b.module ? 1 : b.module > a.module ? -1 : 0));
  }
}
