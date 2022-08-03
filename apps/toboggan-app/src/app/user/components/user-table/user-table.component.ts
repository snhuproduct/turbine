/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import {
  SingleHeaderRowTableDataGenerator,
  TableColumnAlignmentEnum,
  TableColumnDataTypeEnum,
  TableColumnDisplayMetadatum,
  TableColumnSortStateEnum,
  TableDataGenerator,
} from '@snhuproduct/toboggan-ui-components-library';
import { dynamicRowData } from './user-table.mock';

@Component({
  selector: 'toboggan-ws-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
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
      [
        { title: '#', dataKey: 'sequence' },
        {
          title: 'First',
          dataKey: 'first',
          parents: '',
          defaultSort: true,
          filters: [
            'Long label for test max width on dropdown',
            'Long label for test max width on dropdown 2',
            'Long label for test max width on dropdown 3',
          ],
          selectedFilters: { a: false, b: false, c: false },
        },
        {
          title: 'Last',
          dataKey: 'last',
          parents: '',
          filters: ['a', 'b', 'c'],
          selectedFilters: { a: false, b: false, c: false },
          alignment: TableColumnAlignmentEnum.Right,
        },
        {
          title: 'Status',
          dataKey: 'status',
          alignment: TableColumnAlignmentEnum.Right,
        },
        {
          title: 'mail',
          dataKey: 'mail',
          parents: '',
          dataType: TableColumnDataTypeEnum.IconLeft,
          filters: ['Twitter', 'lock', 'Instagram'],
          selectedFilters: { Twitter: false, lock: false, Instagram: false },
        },
        {
          title: 'lock',
          dataKey: 'lock',
          parents: '',
          dataType: TableColumnDataTypeEnum.IconRight,
          filters: ['Twitter', 'lock', 'Instagram'],
          selectedFilters: { Twitter: false, lock: false, Instagram: false },
        },
        {
          title: 'Menu',
          dataKey: 'menu',
          dataType: TableColumnDataTypeEnum.InlineMenu,
        },
        {
          title: 'Fixed Menu',
          dataKey: 'fixedMenu',
          dataType: TableColumnDataTypeEnum.FixedInlineMenu,
        },
      ]
    );
}
