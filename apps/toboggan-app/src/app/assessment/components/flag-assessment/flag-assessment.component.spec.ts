import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { mock, MockProxy } from 'jest-mock-extended';
import { SharedModule } from '../../../shared/shared.module';
import { AssessmentService } from '../../services/assessment.service';
import { FlagAssessmentComponent } from './flag-assessment.component';

describe('FlagAssessmentComponent', () => {
  let component: FlagAssessmentComponent;
  let fixture: ComponentFixture<FlagAssessmentComponent>;

  const mockAssessmentService: MockProxy<AssessmentService> = mock<AssessmentService>();

  let assessmentService: AssessmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlagAssessmentComponent],
      imports: [ReactiveFormsModule, StoriesModule, HttpClientModule, SharedModule],
      providers: [
        { provide: AssessmentService, useValue: mockAssessmentService },
      ],
    }).compileComponents();
    assessmentService = TestBed.inject(AssessmentService);
    fixture = TestBed.createComponent(FlagAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('modal should close', () => {
    jest.spyOn(component.editFlagModal, 'close');
    component.hideModal();
    expect(component.editFlagModal.close).toHaveBeenCalled();
  });
  it('should call updateFlagAssessment with valid input', () => {
    const approveAssessmentSpy = jest.spyOn(assessmentService, 'updateFlagAssessment');
    component.editAssessmentForm.setValue({
      is_flagged: true,
      comments: 'mock update',
    });
    component.updateAssessment();
    expect(component.editAssessmentForm.valid).toBeTruthy();
    expect(approveAssessmentSpy).toBeCalled();
  });
});
