import { Component, OnDestroy, OnInit } from '@angular/core';
import { InterstitialLoaderType } from '@snhuproduct/toboggan-ui-components-library';
import { IAssessment } from '@toboggan-ws/toboggan-common';
import { Subscription } from 'rxjs';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { ModalAlertService } from '../../../shared/services/modal-alert/modal-alert.service';
import { AssessmentService } from '../../services/assessment.service';
import { LearnosityFeedbackInjectService } from '../../services/learnosity-feedback-inject.service';
import { LearnosityItemsInjectService } from '../../services/learnosity-items-inject.service';

@Component({
  selector: 'toboggan-ws-assessment-submission-details',
  templateUrl: './assessment-submission-details.component.html',
  styleUrls: ['./assessment-submission-details.component.scss'],
})
export class AssessmentSubmissionDetailsComponent implements OnInit, OnDestroy {
  isShown = false;
  activityId = '';
  userId = '';
  sessionId = '';
  feedbackSessionId = '';
  assessmentId = '';
  isLoading = false;
  injectServiceSubscription = {} as Subscription;
  itemsAppObj: any;
  learnerName = '';
  currentAssessment: IAssessment = {} as IAssessment;
  loaderType = InterstitialLoaderType.Large;

  constructor(
    private learnosityFeedbackInjectService: LearnosityFeedbackInjectService,
    private learnosityItemsInjectService: LearnosityItemsInjectService,
    private assessmentService: AssessmentService,
    private bannerService: BannerService,
    private modalAlertService: ModalAlertService
  ) {}

  ngOnInit(): void {
    this.currentAssessment = this.assessmentService.getAssessmentInEvaluation();
    this.assessmentId = this.currentAssessment.id as string;
    this.activityId = this.currentAssessment.activityId as string;
    this.userId = this.currentAssessment.userId as string;
    this.sessionId = this.currentAssessment.sessionId as string;

    if (this.activityId && this.sessionId && this.userId) {
      this.learnosityFeedbackInjectService.generateReportForAssessments(
        this.activityId,
        this.sessionId,
        this.userId
      );
    }

    this.learnerName =
      this.assessmentService.getAssessmentInEvaluation()?.learner;

    this.injectServiceSubscription =
      this.learnosityItemsInjectService.renderItemsComplete$.subscribe(
        ({ newSessionId, itemsApp }) => {
          this.feedbackSessionId = newSessionId;
          this.itemsAppObj = itemsApp;
        }
      );
  }
  toggleShowEvaluation() {
    this.isShown = !this.isShown;
    if (this.learnosityFeedbackInjectService.renderReportCompleted) {
      setTimeout(() => {
        this.learnosityFeedbackInjectService.handleAssessorFeedback(
          this.userId,
          this.activityId,
          this.sessionId
        );
      }, 2000);
    }
  }

  getSimilarityClass() {
    return this.currentAssessment.similarity < 0.27
      ? 'gp-green-80'
      : this.currentAssessment.similarity >= 0.27 &&
        this.currentAssessment.similarity < 0.89
      ? 'gp-yellow-80'
      : 'gp-red-80';
  }

  finishEvaluation() {
    if (this.feedbackSessionId && this.itemsAppObj) {
      this.modalAlertService.showModalAlert({
        type: 'warning',
        heading: `Submit evaluation?`,
        message: `If you submit, your evaluation and feedback will be sent to the learner. Once submitted, the evaluation can’t be edited.`,
        buttons: [
          {
            title: 'No, keep evaluating',
            onClick: () => {
              this.modalAlertService.hideModalAlert();
            },
            style: 'secondary',
          },
          {
            title: 'Yes, submit',
            onClick: async () => {
              this.isLoading = true;
              const saveSettings = {
                success: (response_ids: any) => {
                  this.isLoading = false;
                  console.log('save has been successful', response_ids);
                  this.updateAssessment();
                },
                error: (e: any) => {
                  this.isLoading = false;
                  console.log('save has failed', e);
                },
              };
              this.itemsAppObj?.save(saveSettings);
            },
            style: 'primary',
          },
        ],
      });
    }
  }

  async updateAssessment() {
    const assessmentData: Partial<IAssessment> = {
      evaluated: true,
    };
    const { learner } = this.currentAssessment;
    try {
      this.isLoading = true;
      //call update assessment  - which will be updating LRS as well
      await this.assessmentService.updateAssessment(
        this.assessmentId,
        assessmentData
      );
      this.bannerService.showBanner({
        type: 'success',
        heading: '',
        message: `You finished evaluating ${learner}’s submission. It’s been moved to your completed evaluations.`,
        button: null,
        autoDismiss: true,
      });
      this.isLoading = false;
      return true;
    } catch (error) {
      // handle error scenario
      this.isLoading = false;
      // this.editFlagModal.modal?.content?.alertBanners.push({
      //   type: 'error',
      //   heading: '',
      //   message: `<strong>${this.assessment?.learner}</strong>'s couldn't be flagged.`,
      // });
      return false;
    }
  }

  ngOnDestroy(): void {
    if (this.injectServiceSubscription)
      this.injectServiceSubscription.unsubscribe();
  }
}
