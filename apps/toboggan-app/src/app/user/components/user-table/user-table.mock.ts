//TODO: UI-components type is outdated! cellData is JSONObject there and causes a type mismatch here.
interface ITableRow {
  rowId: string;
  cellData: any[];
}

export const dynamicRowData: ITableRow[] = [
  {
    rowId: '1',
    cellData: [
      1,
      'Mark',
      'Otto',
      ['gp-icon-mail', 'mdo'],
      ['gp-icon-lock', 'text'],
      { selected: 'option A', options: ['option A', 'option B', 'option C'] },
      {
        title: 'Fixed',
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
    ],
  },
  {
    rowId: '2',
    cellData: [
      2,
      'Jacob',
      'Thornton',
      ['gp-icon-mail', 'f'],
      ['gp-icon-lock', 'text'],
      { selected: 'option A', options: ['option A', 'option B', 'option C'] },
      {
        title: 'Fixed',
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
    ],
  },
  {
    rowId: '3',
    cellData: [
      3,
      'Larry the Bird',
      '',
      ['gp-icon-mail', 'lry'],
      ['gp-icon-lock', 'text'],
      { selected: 'option A', options: ['option A', 'option B', 'option C'] },
      {
        title: 'Fixed',
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
    ],
  },
  {
    rowId: '4',
    cellData: [
      4,
      'Fourth',
      'Person',
      ['gp-icon-mail', 'lry'],
      ['gp-icon-lock', 'text'],
      { selected: 'option A', options: ['option A', 'option B', 'option C'] },
      {
        title: 'Fixed',
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
    ],
  },
  {
    rowId: '5',
    cellData: [
      5,
      'Fifth',
      'Person',
      ['gp-icon-mail', 'lry'],
      ['gp-icon-lock', 'text'],
      { selected: 'option A', options: ['option A', 'option B', 'option C'] },
      {
        title: 'Fixed',
        selected: 'option A',
        options: ['option A', 'option B', 'option C'],
      },
    ],
  },
];
