import {
  TableColumnAlignmentEnum,
  TableColumnDataTypeEnum,
  TableColumnDisplayMetadatum,
  TableColumnSortStateEnum,
} from '@snhuproduct/toboggan-ui-components-library';

export const permissionTableHeader: TableColumnDisplayMetadatum[] = [
  {
    title: 'Application',
    dataKey: 'application',
    parents: '',
    alignment: TableColumnAlignmentEnum.Left,
    sort: TableColumnSortStateEnum.Ascending,
    searchableField: true,
  },
  {
    title: 'Module',
    dataKey: 'module',
    searchableField: true,
  },
  {
    title: 'Access Level',
    dataKey: 'accessLevel',
    searchableField: true,
  },
  {
    title: 'User Group(s)',
    dataKey: 'userGroups',
    searchableField: true,
    dataType: TableColumnDataTypeEnum.LinkList,
  },
];
