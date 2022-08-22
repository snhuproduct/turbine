import { Injectable } from '@angular/core';
import {
  TableColumnDisplayMetadatum,
  TableColumnSortStateEnum,
  TableRow
} from '@snhuproduct/toboggan-ui-components-library';

@Injectable({
  providedIn: 'root',
})
export class TableSortingService {
  public getSortDirectionCoefficient(
    columnDisplayMetadata: TableColumnDisplayMetadatum[]
  ): { sortColumnDataKey: string; sortDirectionCoefficient: number } {
    let sortColumnDataKey = '';

    for (let i = 0; i < columnDisplayMetadata.length; i++) {
      if (
        columnDisplayMetadata[i].sort &&
        columnDisplayMetadata[i].sort !== TableColumnSortStateEnum.None
        ){
          sortColumnDataKey = columnDisplayMetadata[i].dataKey;
        if (columnDisplayMetadata[i].sort === TableColumnSortStateEnum.Ascending){
          return { sortColumnDataKey, sortDirectionCoefficient: 1 };
        }
        if (columnDisplayMetadata[i].sort === TableColumnSortStateEnum.Descending){
          return { sortColumnDataKey, sortDirectionCoefficient: -1 };
        }
        break;
      }
    }
    return { sortColumnDataKey, sortDirectionCoefficient: 0 };
  }

  public sortOnDatakeynCoeff(
    a: TableRow,
    b: TableRow,
    sortColumnDataKey: string,
    sortDirectionCoefficient: number
  ):number {
      if (a.cellData[sortColumnDataKey] < b.cellData[sortColumnDataKey]) {
        return -1 * sortDirectionCoefficient;
      }
      if (a.cellData[sortColumnDataKey] > b.cellData[sortColumnDataKey]) {
        return 1 * sortDirectionCoefficient;
      }
      return 0;
  }

  public getSortedData(
    data: TableRow[],
    sortColumnDataKey: string,
    sortDirectionCoefficient: number
  ) {
    return data.sort((a, b) => this.sortOnDatakeynCoeff(a,b,sortColumnDataKey,sortDirectionCoefficient));
  }
}
