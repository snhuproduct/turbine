/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import {
  SingleHeaderRowTableDataGenerator, TableColumnDisplayMetadatum, TableDataGenerator, TableRow
} from '@snhuproduct/toboggan-ui-components-library';
import { Observable, Subscription } from 'rxjs';
import { TableSortingService } from '../table-sorting/table-sorting.service';

export interface ITableRowFilterFunc{
  (tr:TableRow, columnMetadata?:TableColumnDisplayMetadatum[], searchVal?:unknown): boolean;
}

export interface ICelldataFormatterFunc{
  (dataArray:unknown): TableRow[];
}

export interface ITableDataGeneratorFactoryOutput{
  dataGenerator: SingleHeaderRowTableDataGenerator,
  tableRows?: TableRow[],
  rawData?: unknown
}

@Injectable({
  providedIn: 'root'
})

export class TableDataService {
  constructor(private tablesortingService:TableSortingService) {}

  private defaultFilterFunc (tr:TableRow, columnMetadata:TableColumnDisplayMetadatum[], searchString:string):boolean{
    const colsToMatch:string[] = columnMetadata
        .filter((aColMetadataObj:TableColumnDisplayMetadatum)=>aColMetadataObj.searchableField)
        .map((aColMetadataObj:TableColumnDisplayMetadatum)=>aColMetadataObj.dataKey);
    return colsToMatch.reduce((prevBool:boolean, currKey:string)=>
        (prevBool || new RegExp(searchString, 'i').test(tr.cellData[currKey].toString()))
    , false);
  }

  public dataGeneratorFactoryObs(
    rowsObservable:Observable<unknown>,
    columnMetadata:TableColumnDisplayMetadatum[],
    cellDataFormatterFunc:ICelldataFormatterFunc,
    rowsPerPage:number,
    currentPageNumer:number,
    updateFunc=()=>{},
    additionalFilterFuncs:ITableRowFilterFunc[] = []
    ):Observable<ITableDataGeneratorFactoryOutput>{
    return new Observable((observer)=>{
      let rowsObservableSubscription:Subscription;
      const tableDataGeneratorFactoryOutput:ITableDataGeneratorFactoryOutput = {
        dataGenerator: {} as TableDataGenerator,
        tableRows: [],
        rawData: {}
      };
      tableDataGeneratorFactoryOutput.dataGenerator = 
        new SingleHeaderRowTableDataGenerator(
          // retrieveRowData
          (
            dataGenerator: TableDataGenerator,
            columnDisplayMetadata: TableColumnDisplayMetadatum[],
            _searchString:string = dataGenerator.searchString,
            _pageSize:number = rowsPerPage,
            currentPage:number = currentPageNumer
          )=>{
            rowsObservableSubscription = rowsObservable
              .subscribe(rows=>{
                  dataGenerator.isFiltered = true;
                  const tableRows = cellDataFormatterFunc(rows);
                  tableDataGeneratorFactoryOutput.rawData = rows;
                  const { sortColumnDataKey, sortDirectionCoefficient } = this.tablesortingService.getSortDirectionCoefficient(columnMetadata);
                  const filterFuncs = [this.defaultFilterFunc, ...additionalFilterFuncs];
                  const sortedAndFilteredRows = filterFuncs
                  .reduce(
                    (prevFilteredRows, currentFilterFunc)=>prevFilteredRows.filter(aRow=>currentFilterFunc(aRow, columnDisplayMetadata, dataGenerator.searchString))
                    ,tableRows)
                  .sort((a,b)=>this.tablesortingService.sortOnDatakeynCoeff(a,b, sortColumnDataKey, sortDirectionCoefficient));
                  tableDataGeneratorFactoryOutput.tableRows = sortedAndFilteredRows;
                  const startRow = (currentPage - 1) * rowsPerPage;
                  const pageData = sortedAndFilteredRows.slice(startRow, startRow+rowsPerPage);
                  dataGenerator.retrievalCallback(
                      pageData, 
                      sortedAndFilteredRows.length, 
                      currentPage, 
                      Math.ceil(sortedAndFilteredRows.length/rowsPerPage)
                  );
              })
          },
          // updateRow
          updateFunc,
          columnMetadata
      )
      observer.next(tableDataGeneratorFactoryOutput);
      return {
        unsubscribe() {
          rowsObservableSubscription.unsubscribe();
        },
      };
    });
  }
}
