import {
  TableColumnAlignmentEnum,
  TableColumnDataTypeEnum,
} from '@snhuproduct/toboggan-ui-components-library';

export const userTableHeader = [
  {
    title: 'First Name',
    dataKey: 'first',
    parents: '',
    alignment: TableColumnAlignmentEnum.Left,
  },
  {
    title: 'Last name',
    dataKey: 'last',
    alignment: TableColumnAlignmentEnum.Left,
  },
  {
    title: 'E-mail address',
    dataKey: 'mail',
    dataType: TableColumnDataTypeEnum.IconLeft,
    alignment: TableColumnAlignmentEnum.Left,
  },
  {
    title: 'Status',
    dataKey: 'status',
    filters: ['Active', 'Inactive'],
    alignment: TableColumnAlignmentEnum.Left,
    dataType: TableColumnDataTypeEnum.Tag,
    selectedFilters: { a: false, b: false },
  },
];
