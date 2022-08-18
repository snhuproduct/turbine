import { TableColumnDisplayMetadatum } from '@snhuproduct/toboggan-ui-components-library';

export const mockColumnMetadata: TableColumnDisplayMetadatum[] = [
  {
    title: 'First Name',
    dataKey: 'first',
    parents: '',
    alignment: 'left',
  },
  {
    title: 'Last name',
    dataKey: 'last',
    alignment: 'left',
  },
  {
    title: 'E-mail address',
    dataKey: 'mail',
    dataType: 'icon-left',
    alignment: 'left',
  },
  {
    title: 'Status',
    dataKey: 'status',
    filters: ['Active', 'Inactive'],
    alignment: 'left',
    dataType: 'tag',
    selectedFilters: {
      Active: false,
      Inactive: false,
    },
  },
];
