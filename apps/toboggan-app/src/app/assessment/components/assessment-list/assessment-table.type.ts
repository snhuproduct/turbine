import {
  TableColumnAlignmentEnum,
  TableColumnDataTypeEnum,
  TableColumnDisplayMetadatum,
  TableColumnSortStateEnum
} from '@snhuproduct/toboggan-ui-components-library';

export const assessmentTableHeader: TableColumnDisplayMetadatum[] = [
  {
    title: 'Time left',
    dataKey: 'time_left',
    parents: '',
    defaultSort: true,
    searchableField: true,
    sort: TableColumnSortStateEnum.Descending,
    alignment: TableColumnAlignmentEnum.Left,
    dataType: TableColumnDataTypeEnum.TextNowrap,
  },
  {
    title: 'Learner',
    dataKey: 'learner',
    parents: '',
    searchableField: true,
    alignment: TableColumnAlignmentEnum.Left,
    sort: TableColumnSortStateEnum.Disabled,
  },
  {
    title: 'Competency',
    dataKey: 'competency',
    parents: '',
    defaultSort: true,
    searchableField: true,
    alignment: TableColumnAlignmentEnum.Left,
    dataType: TableColumnDataTypeEnum.TextNowrap,
  },
  {
    title: 'Type',
    dataKey: 'type',
    parents: '',
    defaultSort: true,
    searchableField: true,
    alignment: TableColumnAlignmentEnum.Left,
    dataType: TableColumnDataTypeEnum.TextNowrap,
  },
  {
    title: 'Attempt',
    dataKey: 'attempt',
    parents: '',
    defaultSort: true,
    searchableField: true,
    alignment: TableColumnAlignmentEnum.Left,
    dataType: TableColumnDataTypeEnum.Attempts,
  },
  {
    title: 'Instructor',
    dataKey: 'instructor',
    parents: '',
    defaultSort: true,
    searchableField: true,
    alignment: TableColumnAlignmentEnum.Left,
    dataType: TableColumnDataTypeEnum.TextNowrap,
  },
  {
    title: 'Similarity',
    dataKey: 'similarity',
    parents: '',
    defaultSort: true,
    searchableField: true,
    alignment: TableColumnAlignmentEnum.Center,
    dataType: TableColumnDataTypeEnum.PercentLink,
  },
];

export enum RowActions {
  Edit = 'edit',
  ViewDetails = 'view details',
  FlagForInstructorReview = 'flag for instructor review',
  Delete = 'delete',
  Evaluate = 'evaluate',
  RemoveFlag = 'remove flag',
}