import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  TableDataGenerator,
  TableRow,
} from '@snhuproduct/toboggan-ui-components-library';
import { IRowActionEvent } from '@snhuproduct/toboggan-ui-components-library/lib/table/row-action-event.interface';
import { IAssessment, getFormattedDateDiff, getDateDiffObject } from '@toboggan-ws/toboggan-common';
import { Observable, Subscription } from 'rxjs';
import {
  ITableDataGeneratorFactoryOutput,
  TableDataService,
} from '../../../shared/services/table-data/table-data.service';
import { AssessmentService } from '../../services/assessment.service';
import { assessmentTableHeader, RowActions } from './assessment-table.type';

const THRESHOLD_OF_RED = 0;
const THRESHOLD_OF_YELLOW = 6 * 60 * 60 * 1000; // 6 hours

@Component({
  selector: 'toboggan-ws-assessment-list',
  templateUrl: './assessment-list.component.html',
})
export class AssessmentListComponent implements OnInit, OnDestroy {
  dataGenerator: TableDataGenerator = {} as TableDataGenerator;
  assessmentList: TableRow[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  showFlagAssessmentModal = false;
  editAssessmentData!: IAssessment;
  private dataGeneratorFactoryOutputObserver: Observable<ITableDataGeneratorFactoryOutput> =
    {} as Observable<ITableDataGeneratorFactoryOutput>;
  private datageneratorSubscription: Subscription = {} as Subscription;
  private updateAssessmentSubscription: Subscription = {} as Subscription;
  @Input() selectedTab = 'toBeEvaluate';

  constructor(
    private assessmentService: AssessmentService,
    private tableDataService: TableDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshTableData();
  }

  ngOnDestroy(): void {
    [this.datageneratorSubscription, this.updateAssessmentSubscription].map(
      (s) => {
        if (s.unsubscribe) s.unsubscribe();
      }
    );
  }
  onRowAction(event: IRowActionEvent) {
    const { action, rowId } = event;
    const rowData = this.dataGenerator.rowData.find(
      (row) => row.rowId === rowId
    );

    if (!rowData) {
      throw new Error('Could not find rowData for rowId: ' + rowId);
    }

    switch (action) {
      case RowActions.FlagForInstructorReview:
        this.editAssessmentData = rowData.cellData as unknown as IAssessment;
        this.showFlagAssessmentModal = true;
        break;
      case RowActions.Evaluate:
        this.router.navigate([
          `/assessments/details/${rowData.cellData['id']}`,
        ]);
        break;
    }
  }
  handleEditFlagAssessmentAction() {
    this.showFlagAssessmentModal = false;
  }
  getActionMenuItems = () => {
    const actionMenuItems = [
      'view details',
      'edit',
      'delete',
      'flag for instructor review',
    ];
    return this.selectedTab === 'toBeEvaluate'
      ? [...actionMenuItems, 'evaluate']
      : actionMenuItems;
  };

  formatTableRowsWithAssessmentData(fetchedData: unknown): TableRow[] {
    //API call
    const assessments = fetchedData as IAssessment[];

    const data = assessments.map((cellData, index) => {
      const actionIcon = cellData.flagged ? 'gp-icon-flag' : '';
      const className = cellData.flagged ? 'gp-table-x-bodyrow-diabled' : '';

      const dateDiffObj = getDateDiffObject(cellData.timeLeft, new Date());

      const timeLeftCellColor = dateDiffObj.diff < THRESHOLD_OF_RED
        ? 'gp-red-20'
        : dateDiffObj.diff >= THRESHOLD_OF_RED && dateDiffObj.diff < THRESHOLD_OF_YELLOW
          ? 'gp-yellow-20'
          : '';

      const similarityColor = cellData.similarity < .27
          ? 'gp-green-80'
          : (cellData.similarity >= .27 && cellData.similarity < .89)
            ? 'gp-yellow-80'
            : 'gp-red-80';

      const attemptBorderCellClass = cellData.currentAttempt > cellData.attempts
          ? 'gp-table-x-cell-warning-border'
          : '';

      const pausedTimeLeftCellObject = {
        value: 'Paused',
        cellType: 'icon-right',
        cellTypeOptions: {
          icon: 'gp-icon-lock',
          iconClass: 'gp-fill-cool-gray-100'
        },
      };

      const defaultTimeLeftCellObject = {
        value: getFormattedDateDiff(dateDiffObj),
        cellClass: timeLeftCellColor,
      };

      const timeLeftCellObject = cellData.flagged ? pausedTimeLeftCellObject : defaultTimeLeftCellObject;

      return {
        rowId: String(index + 1),
        actionIcon,
        className,
        cellData: {
          id: cellData.id,
          time_left: timeLeftCellObject,
          learner: cellData.learner,
          competency: cellData.competency,
          type: cellData.type,
          attempt: {
            0: cellData.currentAttempt,
            1: cellData.attempts,
            cellClass: attemptBorderCellClass,
          },
          instructor: cellData.instructor,
          similarity: [
            cellData.similarity,
            cellData.similarityUrl,
            similarityColor,
          ],
        },
      };
    });

    return data as TableRow[];
  }

  private refreshTableData() {
    if (this.datageneratorSubscription.unsubscribe) {
      this.datageneratorSubscription.unsubscribe();
    }

    const [prevSearchString, prevCurrentPage] = [
      this.dataGenerator.searchString || '',
      this.dataGenerator.currentPage || this.currentPage,
    ];

    this.dataGeneratorFactoryOutputObserver =
      this.tableDataService.dataGeneratorFactoryObs(
        this.assessmentService.fetchAssessments(),
        assessmentTableHeader,
        this.formatTableRowsWithAssessmentData,
        this.itemsPerPage,
        prevCurrentPage,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        []
      );

    this.datageneratorSubscription =
      this.dataGeneratorFactoryOutputObserver.subscribe(
        (dataGeneratorFactoryOutput) => {
          this.dataGenerator = dataGeneratorFactoryOutput.dataGenerator;
          this.assessmentList =
            dataGeneratorFactoryOutput.tableRows as TableRow[];
          this.dataGenerator.searchString = prevSearchString;
        }
      );
  }
}
