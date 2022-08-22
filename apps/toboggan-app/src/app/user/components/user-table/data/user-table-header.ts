import {
  TableColumnAlignmentEnum,
  TableColumnDataTypeEnum,
  TableColumnSortStateEnum
} from '@snhuproduct/toboggan-ui-components-library';

export const userTableHeader = [
  {
    title: 'First name',
    dataKey: 'first',
    parents: '',
    alignment: TableColumnAlignmentEnum.Left,
    searchableField: true
  },
  {
    title: 'Last name',
    dataKey: 'last',
    alignment: TableColumnAlignmentEnum.Left,
    searchableField: true
  },
  {
    title: 'E-mail address',
    dataKey: 'mail',
    dataType: TableColumnDataTypeEnum.IconLeft,
    alignment: TableColumnAlignmentEnum.Left,
    searchableField: true
  },
  {
    title: 'Status',
    dataKey: 'status',
    filters: ['Active', 'Inactive'],
    sort: TableColumnSortStateEnum.None,
    alignment: TableColumnAlignmentEnum.Left,
    dataType: TableColumnDataTypeEnum.Tag,
    selectedFilters: { Active: false, Inactive: false },
  },
];
