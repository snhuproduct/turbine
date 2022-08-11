import { TableColumnDisplayMetadatum } from '@snhuproduct/toboggan-ui-components-library';

export enum RowActions {
  Edit = 'edit',
  ResetPassword = 'reset password',
  Activate = 'activate',
  Deactivate = 'deactivate',
}

export interface IFilterChange {
  filters: Record<string, boolean>;
  columnMetadatum: TableColumnDisplayMetadatum;
}

export interface IRowActionEvent {
  action: RowActions;
  rowId: string;
}
