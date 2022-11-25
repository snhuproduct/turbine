import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  TableDataGenerator,
  TableRow
} from '@snhuproduct/toboggan-ui-components-library';
import { IRowActionEvent } from '@snhuproduct/toboggan-ui-components-library/lib/table/row-action-event.interface';
import { IAssessment } from '@toboggan-ws/toboggan-common';
import { Observable, Subscription } from 'rxjs';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
import {
  ITableDataGeneratorFactoryOutput,
  TableDataService
} from '../../../shared/services/table-data/table-data.service';
import { AssessmentService } from '../../services/assessment.service';
import { assessmentTableHeader, RowActions } from './assessment-table.type';
@Component({
  selector: 'toboggan-ws-assessment-list',
  templateUrl: './assessment-list.component.html',
  styleUrls: ['./assessment-list.component.scss'],
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

  constructor(
    private assessmentService: AssessmentService,
    private tableDataService: TableDataService,
    private modalAlertService: ModalAlertService,
    private bannerService: BannerService
  ) { }

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
      case RowActions.RemoveFlag:
        this.unFlagConfirmationModal(rowData);
        break;
    }
  }

  handleEditFlagAssessmentAction() {
    this.showFlagAssessmentModal = false;
    this.modalAlertService.hideModalAlert();
  }

  getActionMenuItems = (rowData: TableRow) => {
    const actions = [RowActions.Evaluate];
    if (rowData.cellData['is_flagged']) {
      actions.push(RowActions.RemoveFlag);
    } else {
      actions.push(RowActions.FlagForInstructorReview);
    }
    return actions;
  };

  formatTableRowsWithAssessmentData(fetchedData: unknown): TableRow[] {
    //API call
    const assessments = fetchedData as IAssessment[];

    // TODO: Ideally it should come sorted from our API!
    const assessmentsSortedByTimeleft = assessments.sort((a, b) => {
      if (a.time_left[1] && b.time_left[1]) {
        if (a.time_left[1] < b.time_left[1]) {
          return -1;
        }
        if (a.time_left[1] > b.time_left[1]) {
          return 1;
        }
      }

      return 0;
    });

    const data = assessmentsSortedByTimeleft.map((cellData, index) => {
      let className = '';
      let actionIcon = '';
      const copyCellData = Object.assign({}, cellData) as any;
      if (cellData.is_flagged) {
        className = 'flagged-row';
        actionIcon = 'gp-icon-flag';
        copyCellData.time_left[0] = 'gp-icon-lock';
        copyCellData.time_left[1] = 'Paused';
      }
      return {
        rowId: String(index + 1),
        className: className,
        actionIcon: actionIcon,
        cellData: {
          ...copyCellData,
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
        () => { },
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

  unFlagConfirmationModal(rowData: any) {
    this.modalAlertService.showModalAlert({
      type: 'warning',
      heading: 'Remove this flag?',
      message: `If you do, this submission will be added back to your evaluation list, and you’ll have 48 hours to evaluate it.`,
      buttons: [
        {
          title: 'No, cancel',
          onClick: () => {
            this.modalAlertService.hideModalAlert();
          },
          style: 'secondary',
        },
        {
          title: 'Yes, remove flag',
          onClick: async () => {
            try {
              this.modalAlertService.hideModalAlert();
              const body = {
                is_flagged: false
              };
              await this.assessmentService.updateFlagAssessment(rowData.cellData.id, body);
              this.bannerService.showBanner({
                type: 'success',
                heading: '',
                message: `<b>${rowData.cellData.learner}</b>’s submission is no longer flagged. You now have 48 hours to evaluate it.`,
                button: null,
                autoDismiss: true,
              });
            } catch (error) {
              this.bannerService.showBanner({
                type: 'error',
                heading: '',
                message: `The flag couldn’t be removed from <b>${rowData.cellData.learner}</b>’s submission. Please try again.`,
                button: null,
                autoDismiss: true,
              });
            }
          },
          style: 'primary',
        },
      ],
    });
  }
}
