/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import {
  SingleHeaderRowTableDataGenerator,
  TableColumnDisplayMetadatum,
  TableColumnSortStateEnum,
  TableDataGenerator,
} from '@snhuproduct/toboggan-ui-components-library';
import { UserService } from '../../../shared/services/user/user.service';
import { userTableHeader } from './data/user-table-header';
import { dynamicRowData } from './user-table.mock';

@Component({
  selector: 'toboggan-ws-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  private currentPage = 1;
  private resultsPerPage = 10;

  constructor(private userService: UserService) {
    this.fetchUsers();
  }

  dataGenerator: SingleHeaderRowTableDataGenerator =
    new SingleHeaderRowTableDataGenerator(
      (
        dataGenerator: TableDataGenerator,
        columnDisplayMetadata: TableColumnDisplayMetadatum[]
      ) => {
        let sortColumnIndex = 0;
        let sortDirectionCoefficient = 0;
        for (let i = 0; i < columnDisplayMetadata.length; i++) {
          if (
            columnDisplayMetadata[i].sort &&
            columnDisplayMetadata[i].sort !== TableColumnSortStateEnum.None
          ) {
            sortColumnIndex = i;
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

        dataGenerator.retrievalCallback(
          dynamicRowData.sort((a, b) => {
            if (a.cellData[sortColumnIndex] < b.cellData[sortColumnIndex]) {
              return -1 * sortDirectionCoefficient;
            }
            if (a.cellData[sortColumnIndex] > b.cellData[sortColumnIndex]) {
              return 1 * sortDirectionCoefficient;
            }
            return 0;
          }),
          12,
          1,
          2
        );
      },
      () => {},
      userTableHeader
    );

  public fetchUsers() {
    this.userService.fetchUsers().subscribe((users) => {
      console.log(users);
    });
  }

  public generateUserCell() {}
}
