import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { of } from 'rxjs';
import { AssessmentService } from '../../services/assessment.service';

import { AssessmentListComponent } from './assessment-list.component';
import { RowActions } from './assessment-table.type';

describe('AssessmentListComponent with empty results ', () => {
  let component: AssessmentListComponent;
  let fixture: ComponentFixture<AssessmentListComponent>;
  const mockData = [{
    "id": "1",
    "learner": "Jessica",
    "result": null,
    "resultComment": null,
    "competency": "Analyze Written Works",
    "type": "Final",
    "currentAttempt": 1,
    "attempts": 3,
    "instructor": "Christopher Edwards",
    "similarity": .27,
    "similarityUrl": 'https://google.com',
    "evaluated": false,
    "flagged": true,
  }]
  const mockAssessmentService = {
    fetchAssessments: jest.fn().mockReturnValue(of(mockData)),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoriesModule, NoopAnimationsModule],
      declarations: [AssessmentListComponent],
      providers: [
        { provide: AssessmentService, useValue: mockAssessmentService },
        {
          provide: Router,
          useValue: {},
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service for fetching assessments', () => {
    const fetchAssessments = jest.spyOn(
      mockAssessmentService,
      'fetchAssessments'
    );
    fixture.detectChanges();
    expect(fetchAssessments).toHaveBeenCalled();
  });

  it('table should show "Thanks to your awesome evaluating skills, there’s nothing here to evaluate (for now)." when no assessments are available', () => {
    const noResultsContainer = fixture.debugElement.query(
      By.css('.gp-table-x-noresults')
    );
    expect(noResultsContainer).toBeDefined();
  });

  it('onRowAction method should call with - argument action RemoveFlag', () => {
    const unFlagConfirmationModal = jest.spyOn(
      component, 'unFlagConfirmationModal'
    );
    component.onRowAction({ action: RowActions.RemoveFlag, rowId: '1' });
    expect(unFlagConfirmationModal).toHaveBeenCalled();
  });

  it('onRowAction method should call with - argument action FlagForInstructorReview', () => {
    component.onRowAction({ action: RowActions.FlagForInstructorReview, rowId: '1' });
    expect(component.editAssessmentData).toBeDefined();
  });

  it('getActionMenuItems method should call', () => {
    const data = {
      cellData: mockData[0]
    };
    const actions = component.getActionMenuItems(data as any);
    expect(actions).toBeDefined();
  });

});
