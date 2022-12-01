import {
  Component, OnDestroy,
  OnInit
} from '@angular/core';
import {
  TableDataGenerator,
  TableRow
} from '@snhuproduct/toboggan-ui-components-library';
import { IAssessment } from '@toboggan-ws/toboggan-common';
import { Observable, Subscription } from 'rxjs';
import {
  ITableDataGeneratorFactoryOutput,
  TableDataService
} from '../../../shared/services/table-data/table-data.service';
import { AssessmentService } from '../../services/assessment.service';
import { evaluatedAssessmentTableHeader } from './assessment-evaluated-table.type';

@Component({
  selector: 'toboggan-ws-assessment-evaluated-list',
  templateUrl: './assessment-evaluated-list.component.html',
})
export class AssessmentEvaluatedListComponent implements OnInit, OnDestroy {
  dataGenerator: TableDataGenerator = {} as TableDataGenerator;
  assessmentList: TableRow[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  private dataGeneratorFactoryOutputObserver: Observable<ITableDataGeneratorFactoryOutput> =
    {} as Observable<ITableDataGeneratorFactoryOutput>;
  private datageneratorSubscription: Subscription = {} as Subscription;
  private updateEvaluatedAssessmentSubscription: Subscription = {} as Subscription;

  constructor(
    private assessmentService: AssessmentService,
    private tableDataService: TableDataService,
  ) { }

  ngOnInit(): void {
    this.refreshTableData();
  }

  ngOnDestroy(): void {
    [this.datageneratorSubscription, this.updateEvaluatedAssessmentSubscription].map((s) => {
      if (s.unsubscribe) s.unsubscribe();
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getActionMenuItems = () => {
    return ['view details', 'edit', 'delete'];
  };

  formatTableRowsWithAssessmentsData(fetchedData: unknown): TableRow[] {
    //API call
    const assessments = fetchedData as IAssessment[];

    const data = assessments.map((cellData, index) => {
      return {
        rowId: String(index + 1),
        cellData: {
          learner: cellData.learner,
          result: {
            cellType: cellData.resultComment ? 'tooltip' : null,
            cellTypeOptions: {
              heading: 'Comments',
              text: cellData.resultComment
            },
            value: cellData.result,
          },
          competency: cellData.competency,
          type: cellData.type,
          attempt: [cellData.currentAttempt, cellData.attempts],
          instructor: cellData.instructor,
          similarity: [
            cellData.similarity,
            cellData.similarityUrl,
            cellData.similarity < .27
              ? 'gp-green-80'
              : (cellData.similarity >= .27 && cellData.similarity < .89)
                ? 'gp-yellow-80'
                : 'gp-red-80',
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
        this.assessmentService.fetchEvaluatedAssessments(),
        evaluatedAssessmentTableHeader,
        this.formatTableRowsWithAssessmentsData,
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
          this.assessmentList = dataGeneratorFactoryOutput.tableRows as TableRow[];
          this.dataGenerator.searchString = prevSearchString;
        }
      );
  }
}
