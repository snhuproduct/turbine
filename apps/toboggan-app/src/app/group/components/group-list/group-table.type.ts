import {
  TableColumnAlignmentEnum,
  TableColumnDataTypeEnum,
  TableColumnDisplayMetadatum,
  TableColumnSortStateEnum,
} from '@snhuproduct/toboggan-ui-components-library';

export const groupTableHeader: TableColumnDisplayMetadatum[] = [
  {
    title: 'Name',
    dataKey: 'name',
    parents: '',
    defaultSort: true,
    searchableField: true,
    alignment: TableColumnAlignmentEnum.Left,
    dataType: TableColumnDataTypeEnum.TextNowrap,
  },
  {
    title: 'Description',
    dataKey: 'description',
    parents: '',
    searchableField: true,
    alignment: TableColumnAlignmentEnum.Left,
    sort: TableColumnSortStateEnum.Disabled,
  },
];

export enum RowActions {
  Edit = 'edit',
  ViewDetails = 'view details',
  Delete = 'delete',
}
