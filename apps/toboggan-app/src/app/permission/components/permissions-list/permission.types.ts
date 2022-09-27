import { TableColumnDisplayMetadatum } from '@snhuproduct/toboggan-ui-components-library';

export interface IFilterChange {
  filters: Record<string, boolean>;
  columnMetadatum: TableColumnDisplayMetadatum;
}
