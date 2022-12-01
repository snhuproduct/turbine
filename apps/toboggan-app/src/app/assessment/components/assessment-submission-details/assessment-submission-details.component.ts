import { Component, OnInit } from '@angular/core';
import { LearnosityFeedbackInjectService } from '../../services/learnosity-feedback-inject.service';

@Component({
  selector: 'toboggan-ws-assessment-submission-details',
  templateUrl: './assessment-submission-details.component.html',
  styleUrls: ['./assessment-submission-details.component.scss'],
})
export class AssessmentSubmissionDetailsComponent implements OnInit {
  isShown = false;

  constructor(
    private learnosityFeedbackInjectService: LearnosityFeedbackInjectService
  ) {}

  ngOnInit(): void {
    const SAMPLE_ASSESSMENT_TO_EVALUATE = LIST_OF_ASSESSMENTS[0];
    this.learnosityFeedbackInjectService.generateReportForAssessments(
      SAMPLE_ASSESSMENT_TO_EVALUATE.activityId,
      SAMPLE_ASSESSMENT_TO_EVALUATE.sessionId,
      SAMPLE_ASSESSMENT_TO_EVALUATE.userId
    );
  }
  toggleShowEvaluation() {
    const SAMPLE_ASSESSMENT_TO_EVALUATE = LIST_OF_ASSESSMENTS[0];
    this.isShown = !this.isShown;
    if (this.learnosityFeedbackInjectService.renderReportCompleted) {
      setTimeout(() => {
        this.learnosityFeedbackInjectService.handleAssessorFeedback(
          SAMPLE_ASSESSMENT_TO_EVALUATE.userId,
          SAMPLE_ASSESSMENT_TO_EVALUATE.activityId,
          SAMPLE_ASSESSMENT_TO_EVALUATE.sessionId
        );
      }, 2000);
    }
  }
}

const LIST_OF_ASSESSMENTS = [
  {
    activityId: 'DemoTest_DemoSiteExample',
    userId: 'e739df6f-5353-4ba9-9022-39587b100657',
    sessionId: 'd0a6d111-4909-4e6c-8ebb-04e7600a7320',
  },
  {
    activityId: 'DemoTest_DemoSiteExample',
    userId: 'e739df6f-5353-4ba9-9022-39587b100657',
    sessionId: '1d967443-9fa0-4de4-bca3-6d74226b18b5',
  },
];
