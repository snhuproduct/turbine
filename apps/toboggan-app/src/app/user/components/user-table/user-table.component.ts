/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
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
export class UserTableComponent implements OnInit {
  dataGenerator: SingleHeaderRowTableDataGenerator | null = null;

  constructor() {}

  ngOnInit(): void {
    this.dataGenerator = new SingleHeaderRowTableDataGenerator(
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

        // @ts-ignore
        dataGenerator.retrievalCallback(
          // @ts-ignore
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
        { title: '#', dataKey: '1' },
        {
          dataKey: '2',
          title: 'First',
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
          dataKey: '3',
          title: 'Last',
          parents: '',
          filters: ['a', 'b', 'c'],
          selectedFilters: { a: false, b: false, c: false },
          alignment: TableColumnAlignmentEnum.Right,
        },
        {
          dataKey: '4',
          title: 'mail',
          parents: '',
          dataType: TableColumnDataTypeEnum.IconLeft,
          filters: ['Twitter', 'lock', 'Instagram'],
          selectedFilters: { Twitter: false, lock: false, Instagram: false },
        },
        {
          dataKey: '5',
          title: 'lock',
          parents: '',
          dataType: TableColumnDataTypeEnum.IconRight,
          filters: ['Twitter', 'lock', 'Instagram'],
          selectedFilters: { Twitter: false, lock: false, Instagram: false },
        },
        {
          dataKey: '6',
          title: 'Menu',
          dataType: TableColumnDataTypeEnum.InlineMenu,
        },
        {
          dataKey: '7',
          title: 'Fixed Menu',
          dataType: TableColumnDataTypeEnum.FixedInlineMenu,
        },
      ]
    );
  }
}
