import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearnosityFeedbackInjectService } from '../../services/learnosity-feedback-inject.service';
import { LearnosityItemsInjectService } from '../../services/learnosity-items-inject.service';

import { AssessmentSubmissionDetailsComponent } from './assessment-submission-details.component';

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
