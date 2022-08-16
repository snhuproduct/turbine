import {
  TableColumnDisplayMetadatum,
  TableRow,
} from '@snhuproduct/toboggan-ui-components-library';

export enum RowActions {
  Edit = 'edit',
  ResetPassword = 'reset password',
  Activate = 'activate',
  Deactivate = 'deactivate',
  Cancel = 'cancel',
}

export interface IFilterChange {
  filters: Record<string, boolean>;
  columnMetadatum: TableColumnDisplayMetadatum;
}

export interface IRowActionEvent {
  action: RowActions;
  rowId: string;
}

export interface ICellRowData {
  rowId: string;
  first: string;
  last: string;
  mail: string | string[];
  sequence: string;
  status: string | string[];
}

export interface ITableRow extends TableRow {
  id: string;
}
