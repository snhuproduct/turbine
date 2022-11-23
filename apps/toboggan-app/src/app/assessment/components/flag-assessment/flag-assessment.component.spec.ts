import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { IAssessment } from '@toboggan-ws/toboggan-common';
import { mock, MockProxy } from 'jest-mock-extended';
import { BannerService } from '../../../shared/services/banner/banner.service';
import { SharedModule } from '../../../shared/shared.module';
import { AssessmentService } from '../../services/assessment.service';
import { RowActions } from '../assessment-list/assessment-table.type';
import { FlagAssessmentComponent } from './flag-assessment.component';

describe('FlagAssessmentComponent', () => {
  let component: FlagAssessmentComponent;
  let fixture: ComponentFixture<FlagAssessmentComponent>;
  let bannerService: BannerService;

  const mockAssessmentService: MockProxy<AssessmentService> =
    mock<AssessmentService>();

  let assessmentService: AssessmentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlagAssessmentComponent],
      imports: [
        ReactiveFormsModule,
        StoriesModule,
        HttpClientModule,
        SharedModule,
      ],
      providers: [
        { provide: AssessmentService, useValue: mockAssessmentService },
      ],
    }).compileComponents();
    assessmentService = TestBed.inject(AssessmentService);
    fixture = TestBed.createComponent(FlagAssessmentComponent);
    bannerService = TestBed.inject(BannerService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the modal', () => {
    const spy = jest.spyOn(component.editFlagModal, 'open');
    component.ngAfterViewInit();
    expect(spy).toBeCalledTimes(1);
  });

  it('modal should close', () => {
    component.assessment = { id: '1' } as IAssessment;
    jest.spyOn(component.editFlagModal, 'close');
    component.hideModal();
    expect(component.editFlagModal.close).toHaveBeenCalled();
  });

  it('should call updateAssessment with valid input for flag update', () => {
    component.selectedOption = RowActions.FlagForInstructorReview;
    const approveAssessmentSpy = jest.spyOn(
      assessmentService,
      'updateAssessment'
    );
    component.editAssessmentForm.setValue({
      isFlagged: true,
      comments: 'mock update',
    });
    component.updateAssessment();
    expect(component.editAssessmentForm.valid).toBeTruthy();
    expect(approveAssessmentSpy).toBeCalled();
  });

  it('should call updateAssessment with valid input for return unevaluated', () => {
    component.selectedOption = RowActions.ReturnUnEvaluated;
    const approveAssessmentSpy = jest.spyOn(
      assessmentService,
      'returnUnevaluated'
    );
    component.editAssessmentForm.setValue({
      isFlagged: true,
      comments: 'mock update',
    });
    component.updateAssessment();
    expect(component.editAssessmentForm.valid).toBeTruthy();
    expect(approveAssessmentSpy).toBeCalledTimes(1);
  });

  it('should not call updateAssessment with invalid form', () => {
    const spy = jest.spyOn(component, 'processAssessment');
    component.editAssessmentForm.setValue({
      isFlagged: true,
      comments: '',
    });
    component.updateAssessment();
    expect(spy).not.toBeCalled();
  });

  it('should getErrorMessage method should check comment required', () => {
    component.editAssessmentForm.setValue({
      isFlagged: true,
      comments: '',
    });
    component.hasError('required');
    component.getErrorMessage('required');
    expect(component.editAssessmentForm.valid).toBeFalsy();
  });

  it('should getErrorMessage method should check description character count', () => {
    component.editAssessmentForm.setValue({
      isFlagged: true,
      comments:
        'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description',
    });
    component.getErrorMessage('maxlength');
    component.getErrorMessage('maxlength');
    expect(component.editAssessmentForm.valid).toBeFalsy();
  });

  it('should show success banner on successfull completion of update user', async () => {
    component.assessment = { id: '1' } as IAssessment;
    component.editAssessmentForm.setValue({
      isFlagged: true,
      comments: 'mock update',
    });
    const spyService = jest
      .spyOn(assessmentService, 'returnUnevaluated')
      .mockImplementation(() => {
        return Promise.resolve();
      });
    const spyBanner = jest.spyOn(bannerService, 'showBanner');
    await component.updateAssessment();
    expect(spyService).toBeCalledTimes(1);
    expect(spyBanner).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'success',
      })
    );
  });

  it('should show error banner on update user throws an error', async () => {
    component.assessment = { id: '1', learner: 'sample' } as IAssessment;
    component.editFlagModal = {
      modal: {
        content: {
          alertBanners: [],
        },
      },
    } as any;
    component.editAssessmentForm.setValue({
      isFlagged: true,
      comments: 'mock update',
    });
    const spyService = jest
      .spyOn(assessmentService, 'returnUnevaluated')
      .mockImplementation(() => {
        return Promise.reject();
      });
    await component.updateAssessment();
    expect(spyService).toBeCalledTimes(1);
    expect(
      component.editFlagModal.modal?.content.alertBanners[0]
    ).toMatchObject({
      type: 'error',
      heading: '',
      message: `<strong>sample</strong>'s couldn't be returned as unevaluated.`,
    });
  });
});
