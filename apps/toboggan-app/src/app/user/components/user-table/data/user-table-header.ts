import {
  TableColumnAlignmentEnum,
  TableColumnDataTypeEnum,
} from '@snhuproduct/toboggan-ui-components-library';

export const userTableHeader = [
  {
    title: 'First Name',
    dataKey: 'first',
    parents: '',
    defaultSort: true,
    selectedFilters: { a: false, b: false, c: false },
    alignment: TableColumnAlignmentEnum.Center,
  },
  {
    title: 'Last name',
    dataKey: 'last',
    parents: '',
    selectedFilters: { a: false, b: false, c: false },
    alignment: TableColumnAlignmentEnum.Center,
  },
  {
    title: 'E-mail address',
    dataKey: 'mail',
    parents: '',
    dataType: TableColumnDataTypeEnum.IconLeft,
    selectedFilters: { Twitter: false, lock: false, Instagram: false },
    alignment: TableColumnAlignmentEnum.Center,
  },
  {
    title: 'Status',
    dataKey: 'status',
    alignment: TableColumnAlignmentEnum.Center,
  },
];
