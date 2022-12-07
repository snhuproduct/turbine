import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssessmentService } from '../../services/assessment.service';
import { LearnosityFeedbackInjectService } from '../../services/learnosity-feedback-inject.service';
import { LearnosityItemsInjectService } from '../../services/learnosity-items-inject.service';

import { AssessmentSubmissionDetailsComponent } from './assessment-submission-details.component';

const mockAssessmentService = {
  getAssessmentInEvaluation: () => {
    return {
      activityId: 'DemoTest_DemoSiteExample',
      attempts: 1,
      competency: "Explain Writer's Choices",
      currentAttempt: 1,
      evaluated: false,
      flagged: false,
      id: '2',
      instructor: 'Julia De La Cruz',
      learner: 'James',
      result: null,
      resultComment: null,
      sessionId: '1d967443-9fa0-4de4-bca3-6d74226b18b5',
      similarity: 0.89,
      similarityUrl: 'https://google.com',
      timeLeft: '2022-12-07T02:01:59.883Z',
      type: 'Practice 1',
      userId: 'e739df6f-5353-4ba9-9022-39587b100657',
    };
  },
  updateAssessment: jest.fn(),
};
describe('AssessmentSubmissionDetailsComponent', () => {
  let component: AssessmentSubmissionDetailsComponent;
  let fixture: ComponentFixture<AssessmentSubmissionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AssessmentSubmissionDetailsComponent],
      providers: [
        LearnosityFeedbackInjectService,
        LearnosityItemsInjectService,
        {
          provide: AssessmentService,
          useValue: mockAssessmentService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentSubmissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
