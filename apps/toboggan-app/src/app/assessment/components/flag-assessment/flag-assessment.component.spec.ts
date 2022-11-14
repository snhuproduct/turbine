import { AssessmentService } from '../../services/assessment.service';
import { FlagAssessmentComponent } from './flag-assessment.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { of } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';

describe('FlagAssessmentComponent', () => {
  let component: FlagAssessmentComponent;
  let fixture: ComponentFixture<FlagAssessmentComponent>;

  const mockAssessmentService = {
    flagAssessment: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlagAssessmentComponent],
      imports: [ReactiveFormsModule, StoriesModule, HttpClientModule, SharedModule],
      providers: [
        { provide: AssessmentService, useValue: mockAssessmentService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FlagAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('modal should close', () => {
    jest.spyOn(component.editFlagModal, 'close');
    component.editModalHidden();
    expect(component.editFlagModal.close).toHaveBeenCalled();
  });

  it('shold call flagAssessment', () => {
    jest.spyOn(component.editFlagModal, 'close');
    component.editModalAccept();
    expect(component.editFlagModal.close).toHaveBeenCalled();
  });

});
