import { Component } from '@angular/core';
import {
  SingleHeaderRowTableDataGenerator,
  TableColumnDisplayMetadatum,
  TableColumnSortStateEnum,
  TableDataGenerator,
  TableRow
} from '@snhuproduct/toboggan-ui-components-library';
import { IRowActionEvent } from '@snhuproduct/toboggan-ui-components-library/lib/table/row-action-event.interface';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../../shared/services/user/user.service';
import { userTableHeader } from './data/user-table-header';

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

  private filters: Map<string, Record<string, boolean>> = new Map();

  constructor(private userService: UserService) { }

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
      () => { },
      userTableHeader
    );

  getActionMenuItems(rowData: TableRow) {
    const actions = ['remove'];
    return actions;
  }

  onRowAction(event: IRowActionEvent) {
    console.log(event);
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

  public onFilterChange(event: IFilterChange): void {
    // if all filters are false, remove the filter
    //TODO: We actually need to implement filtering.
    if (Object.values(event.filters).every((value) => !value)) {
      this.filters.delete(event.columnMetadatum.dataKey);
    }
    this.filters.set(event.columnMetadatum.dataKey, event.filters);
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
