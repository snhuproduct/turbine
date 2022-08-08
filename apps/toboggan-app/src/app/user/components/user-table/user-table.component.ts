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
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../../shared/services/user/user.service';
import { userTableHeader } from './data/user-table-header';

@Component({
  selector: 'toboggan-ws-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  private currentPage = 1;
  private resultsPerPage = 10;
  public dynamicRowData: TableRow[] = [];

  constructor(private userService: UserService) {}

  dataGenerator: SingleHeaderRowTableDataGenerator =
    new SingleHeaderRowTableDataGenerator(
      async (
        dataGenerator: TableDataGenerator,
        columnDisplayMetadata: TableColumnDisplayMetadatum[],
        searchString: string,
        pageSize: number,
        currentPage: number
      ) => {
        let sortColumnDataKey = '';
        let sortDirectionCoefficient = 0;

        dataGenerator.isFiltered = true;

        for (let i = 0; i < columnDisplayMetadata.length; i++) {
          if (
            columnDisplayMetadata[i].sort &&
            columnDisplayMetadata[i].sort !== TableColumnSortStateEnum.None
          ) {
            sortColumnDataKey = columnDisplayMetadata[i].dataKey;
            if (
              columnDisplayMetadata[i].sort ===
              TableColumnSortStateEnum.Ascending
            ) {
              sortDirectionCoefficient = 1;
            }
            if (
              columnDisplayMetadata[i].sort ===
              TableColumnSortStateEnum.Descending
            ) {
              sortDirectionCoefficient = -1;
            }
            break;
          }
        }

        await this.generateUserRowData();

        if (this.dynamicRowData.length) {
          const sortedData = this.dynamicRowData.sort((a, b) => {
            if (a.cellData[sortColumnDataKey] < b.cellData[sortColumnDataKey]) {
              return -1 * sortDirectionCoefficient;
            }
            if (a.cellData[sortColumnDataKey] > b.cellData[sortColumnDataKey]) {
              return 1 * sortDirectionCoefficient;
            }
            return 0;
          });
          const startRow = (currentPage - 1) * pageSize;
          const pageData = sortedData.slice(startRow, startRow + pageSize);
          dataGenerator.retrievalCallback(
            pageData,
            sortedData.length,
            currentPage,
            Math.ceil(sortedData.length / pageSize)
          );
        } else {
          dataGenerator.retrievalCallback([], 0, 1, 1);
        }
      },
      () => {},
      userTableHeader
    );

  getActionMenuItems(rowData: TableRow) {
    console.log('getActionMenuItems', rowData);

    const actions = ['edit', 'reset password'];
    if (rowData.cellData['status']?.toString().toLowerCase() === 'active') {
      actions.push('deactivate');
    } else {
      actions.push('activate');
    }
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

    // filter out active only users
    // TODO: It should be refactored once the API has support for searching.
    const activeUsers = data.filter(
      (user) => user.cellData.status[1] === 'Active'
    );

    this.dynamicRowData = activeUsers as TableRow[];
  }
}
