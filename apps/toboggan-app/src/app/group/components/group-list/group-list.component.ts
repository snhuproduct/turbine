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
        let sortColumnDataKey = '';
        let sortDirectionCoefficient = 0;

        dataGenerator.isFiltered = true;
        for (let i = 0; i < columnDisplayMetadata.length; i++) {
          if (
            columnDisplayMetadata[i].sort &&
            columnDisplayMetadata[i].sort !== TableColumnSortStateEnum.None
          ) {
            sortColumnDataKey = columnDisplayMetadata[i].dataKey;
            if (
              columnDisplayMetadata[i].sort ===
              TableColumnSortStateEnum.Ascending
            ) {
              sortDirectionCoefficient = 1;
            }
            if (
              columnDisplayMetadata[i].sort ===
              TableColumnSortStateEnum.Descending
            ) {
              sortDirectionCoefficient = -1;
            }
            break;
          }
        }

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
}

const groupDummyData: any[] = [
  {
    id: 1,
    name: 'Lucas Horne',
    description:
      'sed sem egestas blandit. Nam nulla magna, malesuada vel, convallis in, cursus et, eros. Proin ultrices. Duis volutpat nunc sit',
  },
  {
    id: 2,
    name: 'Joy Berry',
    description:
      'mattis ornare, lectus ante dictum mi, ac mattis velit justo nec ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate, posuere',
  },
  {
    id: 3,
    name: 'Nasim Sullivan',
    description:
      'hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec,',
  },
  {
    id: 4,
    name: 'Jorden Cochran',
    description:
      'egestas, urna justo faucibus lectus, a sollicitudin orci sem eget massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet libero.',
  },
  {
    id: 5,
    name: 'Hadley Shannon',
    description:
      'libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et',
  },
  {
    id: 6,
    name: 'Dolan Delacruz',
    description:
      'malesuada fringilla est. Mauris eu turpis. Nulla aliquet. Proin velit. Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae semper',
  },
  {
    id: 7,
    name: 'Leonard Slater',
    description:
      'consectetuer mauris id sapien. Cras dolor dolor, tempus non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque',
  },
  {
    id: 8,
    name: 'Alfreda Williamson',
    description:
      'eu elit. Nulla facilisi. Sed neque. Sed eget lacus. Mauris non dui nec urna suscipit nonummy. Fusce fermentum fermentum arcu.',
  },
  {
    id: 9,
    name: 'Oscar Simmons',
    description:
      'Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In',
  },
  {
    id: 10,
    name: 'Maxine Chase',
    description:
      'Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices a, auctor non, feugiat nec, diam. Duis',
  },
  {
    id: 11,
    name: 'Blaze Burks',
    description:
      'enim, gravida sit amet, dapibus id, blandit at, nisi. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus',
  },
  {
    id: 12,
    name: 'Timothy Padilla',
    description:
      'Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor dapibus gravida. Aliquam tincidunt, nunc',
  },
  {
    id: 13,
    name: 'Myles Simpson',
    description:
      'ante dictum mi, ac mattis velit justo nec ante. Maecenas mi felis, adipiscing fringilla, porttitor vulputate, posuere vulputate, lacus. Cras',
  },
  {
    id: 14,
    name: 'Caesar Torres',
    description:
      'vitae mauris sit amet lorem semper auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede, nonummy ut, molestie',
  },
  {
    id: 15,
    name: 'Ferris Norris',
    description:
      'blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim',
  },
  {
    id: 16,
    name: "Nicole O'connor",
    description:
      'vitae purus gravida sagittis. Duis gravida. Praesent eu nulla at sem molestie sodales. Mauris blandit enim consequat purus. Maecenas libero',
  },
  {
    id: 17,
    name: 'Hillary Wagner',
    description:
      'ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices a, auctor',
  },
  {
    id: 18,
    name: 'Elvis Bryant',
    description:
      'eu eros. Nam consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus sit amet ante. Vivamus non lorem vitae odio',
  },
  {
    id: 19,
    name: 'Scarlett Rojas',
    description:
      'consequat nec, mollis vitae, posuere at, velit. Cras lorem lorem, luctus ut, pellentesque eget, dictum placerat, augue. Sed molestie. Sed',
  },
  {
    id: 20,
    name: 'Wilma Emerson',
    description:
      'in sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet, erat nonummy',
  },
];
