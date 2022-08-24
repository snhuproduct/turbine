import {
  TableColumnAlignmentEnum,
  TableColumnDisplayMetadatum,
} from '@snhuproduct/toboggan-ui-components-library';

export const groupTableHeader: TableColumnDisplayMetadatum[] = [
  {
    title: 'Name',
    dataKey: 'name',
    parents: '',
    defaultSort: true,
    searchableField: true,
    alignment: TableColumnAlignmentEnum.Left,
  },
  {
    title: 'Description',
    dataKey: 'description',
    parents: '',
    searchableField: true,
    alignment: TableColumnAlignmentEnum.Left,
  },
];

export enum RowActions {
  Edit = 'edit',
  ViewDetails = 'view details',
  Delete = 'delete',
}
