import { Component, OnInit } from '@angular/core';
import {
  ModalButtonConfig,
  SingleHeaderRowTableDataGenerator,
  TableColumnDisplayMetadatum,
  TableDataGenerator,
  TableRow
} from '@snhuproduct/toboggan-ui-components-library';
import { firstValueFrom } from 'rxjs';
import { TableSortingService } from '../../../shared/services/table-sorting/table-sorting.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'toboggan-ws-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  editTitle = 'Edit user group details';
  dataGenerator!: TableDataGenerator;
  groupList: TableRow[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  columnHeadings: TableColumnDisplayMetadatum[] = [];

  modalEditButtons: ModalButtonConfig[] = [
    {
      title: 'Cancel',
      style: 'secondary',
      onClick: () => { return true },
    },
    {
      title: 'Review changes',
      style: 'primary',
      onClick: async () => {
        return false;
      },
    },
  ];

  constructor(
    private groupService: GroupService,
    private tableSortingService: TableSortingService
  ) { }

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
          this.tableSortingService.getSortDirectionCoefficient(
            columnDisplayMetadata
          );

        await this.generateUserRowData();

        if (this.groupList.length) {
          const sortedData = this.tableSortingService.getSortedData(
            this.groupList,
            sortColumnDataKey,
            sortDirectionCoefficient
          );
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

  private refreshTableData() {
    this.generateUserRowData();
    this.dataGenerator.update();
  }
}
