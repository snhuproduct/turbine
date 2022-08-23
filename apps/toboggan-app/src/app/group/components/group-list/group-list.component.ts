import { Component, OnInit } from '@angular/core';
import {
  ModalButtonConfig, TableColumnDisplayMetadatum,
  TableDataGenerator,
  TableRow
} from '@snhuproduct/toboggan-ui-components-library';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { Observable, Subscription } from 'rxjs';
import {
  ITableDataGeneratorFactoryOutput,
  TableDataService
} from '../../../shared/services/table-data/table-data.service';
import { TableSortingService } from '../../../shared/services/table-sorting/table-sorting.service';
import { GroupService } from '../../services/group.service';
import { groupTableHeader } from './group-table.type';

@Component({
  selector: 'toboggan-ws-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  editTitle = 'Edit user group details';
  dataGenerator: TableDataGenerator = {} as TableDataGenerator;
  groupList: TableRow[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  columnHeadings: TableColumnDisplayMetadatum[] = [];
  private dataGeneratorFactoryOutputObserver: Observable<ITableDataGeneratorFactoryOutput> =
    {} as Observable<ITableDataGeneratorFactoryOutput>;
  private datageneratorSubscription: Subscription = {} as Subscription;

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
    private tableSortingService: TableSortingService,
    private tableDataService: TableDataService
  ) { }

  ngOnInit(): void {
    this.refreshTableData();
  }

  getActionMenuItems = (rowData: TableRow) => {
    const actions = ['edit'];
    return actions;
  };

  formatTableRowsWithUserData(fetchedData: unknown): TableRow[] {
    //API call
    const groups = fetchedData as IGroup[];

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

    return data as TableRow[];
  }

  private refreshTableData() {
    const [prevSearchString, prevCurrentPage] = [
      this.dataGenerator.searchString || '',
      this.dataGenerator.currentPage || this.currentPage,
    ];
    this.dataGeneratorFactoryOutputObserver =
      this.tableDataService.dataGeneratorFactoryObs(
        this.groupService.fetchGroups(),
        groupTableHeader,
        this.formatTableRowsWithUserData,
        this.itemsPerPage,
        prevCurrentPage,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => { },
        []
      );
    this.datageneratorSubscription =
      this.dataGeneratorFactoryOutputObserver.subscribe(
        (dataGeneratorFactoryOutput) => {
          this.dataGenerator = dataGeneratorFactoryOutput.dataGenerator;
          this.groupList = dataGeneratorFactoryOutput.tableRows as TableRow[];
          // this.users = dataGeneratorFactoryOutput.rawData as IUser[];
          this.dataGenerator.searchString = prevSearchString;
        }
      );
  }
}
