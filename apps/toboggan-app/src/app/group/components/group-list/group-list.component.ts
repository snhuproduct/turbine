import { Component, OnInit } from '@angular/core';
import {
  SingleHeaderRowTableDataGenerator,
  TableColumnDisplayMetadatum,
  TableColumnSortStateEnum,
  TableDataGenerator,
  TableRow,
} from '@snhuproduct/toboggan-ui-components-library';
import { firstValueFrom } from 'rxjs';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'toboggan-ws-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  dataGenerator!: TableDataGenerator;
  groupList: TableRow[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  columnHeadings: TableColumnDisplayMetadatum[] = [];

  constructor(private groupService: GroupService) {}

  ngOnInit(): void {
    this.columnHeadings = [
      {
        title: 'Name',
        dataKey: 'name',
        parents: '',
        defaultSort: true,
      },
      {
        title: 'Description',
        dataKey: 'description',
        parents: '',
      },
    ];
    this.dataGenerator = new SingleHeaderRowTableDataGenerator(
      async (
        dataGenerator: TableDataGenerator,
        columnDisplayMetadata: TableColumnDisplayMetadatum[],
        searchString: string,
        pageSize: number,
        currentPage: number
      ) => {
        dataGenerator.isFiltered = true;
        const { sortColumnDataKey, sortDirectionCoefficient } =
          this.getSortDirectionCoefficient(columnDisplayMetadata);

        await this.generateUserRowData();

        if (this.groupList.length) {
          const sortedData = this.groupList.sort((a, b) => {
            if (a.cellData[sortColumnDataKey] < b.cellData[sortColumnDataKey]) {
              return -1 * sortDirectionCoefficient;
            }
            if (a.cellData[sortColumnDataKey] > b.cellData[sortColumnDataKey]) {
              return 1 * sortDirectionCoefficient;
            }
            return 0;
          });
          const startRow = (currentPage - 1) * pageSize;
          const pageData = sortedData.slice(startRow, startRow + pageSize);
          dataGenerator.retrievalCallback(
            pageData,
            sortedData.length,
            currentPage,
            Math.ceil(sortedData.length / pageSize)
          );
        } else {
          dataGenerator.retrievalCallback([], 0, 1, 1);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => this.dataGenerator.retrieveRowData,
      this.columnHeadings
    );
  }

  getActionMenuItems = (rowData: TableRow) => {
    const actions = ['edit'];
    return actions;
  };

  async generateUserRowData(): Promise<void> {
    //API call
    const groups = await firstValueFrom(this.groupService.fetchGroups());

    // TODO: Ideally it should come sorted from our API!
    const groupsSortedByName = groups.sort((a, b) => {
      if (a.name && b.name) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
      }

      return 0;
    });

    const data = groupsSortedByName.map((group, index) => {
      return {
        rowId: String(index + 1),
        cellData: {
          id: group.id,
          name: group.name,
          description: group.description,
        },
      };
    });

    this.groupList = data as TableRow[];
  }

  private getSortDirectionCoefficient(
    columnDisplayMetadata: TableColumnDisplayMetadatum[]
  ): { sortColumnDataKey: string; sortDirectionCoefficient: number } {
    let sortColumnDataKey = '';

    for (let i = 0; i < columnDisplayMetadata.length; i++) {
      if (
        columnDisplayMetadata[i].sort &&
        columnDisplayMetadata[i].sort !== TableColumnSortStateEnum.None
      ) {
        sortColumnDataKey = columnDisplayMetadata[i].dataKey;
        if (
          columnDisplayMetadata[i].sort === TableColumnSortStateEnum.Ascending
        ) {
          return { sortColumnDataKey, sortDirectionCoefficient: 1 };
        }
        if (
          columnDisplayMetadata[i].sort === TableColumnSortStateEnum.Descending
        ) {
          return { sortColumnDataKey, sortDirectionCoefficient: -1 };
        }
        break;
      }
    }
    return { sortColumnDataKey, sortDirectionCoefficient: 0 };
  }
}
