import {
  TableColumnAlignmentEnum,
  TableColumnDataTypeEnum,
  TableColumnDisplayMetadatum,
  TableColumnSortStateEnum
} from '@snhuproduct/toboggan-ui-components-library';

export const userTableHeader: TableColumnDisplayMetadatum[] =  [
  {
    title: 'First name',
    dataKey: 'first',
    parents: '',
    alignment: TableColumnAlignmentEnum.Left,
    sort: TableColumnSortStateEnum.Ascending,
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
    sort: TableColumnSortStateEnum.Disabled,
    alignment: TableColumnAlignmentEnum.Left,
    dataType: TableColumnDataTypeEnum.Tag,
    selectedFilters: { Active: true, Inactive: false },
  },
];
