import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  TableDataGenerator,
  TableRow,
} from '@snhuproduct/toboggan-ui-components-library';
import { IRowActionEvent } from '@snhuproduct/toboggan-ui-components-library/lib/table/row-action-event.interface';
import { IAssessment } from '@toboggan-ws/toboggan-common';
import { Observable, Subscription } from 'rxjs';
import {
  ITableDataGeneratorFactoryOutput,
  TableDataService,
} from '../../../shared/services/table-data/table-data.service';
import { AssessmentService } from '../../services/assessment.service';
import { assessmentTableHeader, RowActions } from './assessment-table.type';

@Component({
  selector: 'toboggan-ws-assessment-list',
  templateUrl: './assessment-list.component.html',
})
export class AssessmentListComponent implements OnInit, OnDestroy {
  dataGenerator: TableDataGenerator = {} as TableDataGenerator;
  assessmentList: TableRow[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  showAssessmentModal = false;
  editAssessmentData!: IAssessment;
  selectedOption!: RowActions;
  private dataGeneratorFactoryOutputObserver: Observable<ITableDataGeneratorFactoryOutput> =
    {} as Observable<ITableDataGeneratorFactoryOutput>;
  private datageneratorSubscription: Subscription = {} as Subscription;
  private updateAssessmentSubscription: Subscription = {} as Subscription;

  constructor(
    private assessmentService: AssessmentService,
    private tableDataService: TableDataService
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
        this.showAssessmentModal = true;
        this.selectedOption = RowActions.FlagForInstructorReview;
        break;
      case RowActions.ReturnUnEvaluated:
        this.editAssessmentData = rowData.cellData as unknown as IAssessment;
        this.showAssessmentModal = true;
        this.selectedOption = RowActions.ReturnUnEvaluated;
        break;
    }
  }

  handleAssessmentAction(id: string | undefined) {
    if (this.selectedOption === RowActions.ReturnUnEvaluated && id) {
      this.refreshTableData();
    }
    this.showAssessmentModal = false;
  }

  getActionMenuItems = () => {
    const menuItems = [
      RowActions.Evaluate,
      RowActions.FlagForInstructorReview,
      RowActions.ReturnUnEvaluated,
    ];
    // return ['view details', 'edit', 'delete', 'flag for instructor review'];
    return menuItems;
  };

  formatTableRowsWithAssessmentData(fetchedData: unknown): TableRow[] {
    //API call
    const assessments = fetchedData as IAssessment[];

    // TODO: Ideally it should come sorted from our API!
    const assessmentsSortedByTimeleft = assessments.sort((a, b) => {
      if (a.time_left && b.time_left) {
        if (a.time_left < b.time_left) {
          return -1;
        }
        if (a.time_left > b.time_left) {
          return 1;
        }
      }

      return 0;
    });

    const data = assessmentsSortedByTimeleft.map((cellData, index) => {
      return {
        rowId: String(index + 1),
        cellData: {
          ...cellData,
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
