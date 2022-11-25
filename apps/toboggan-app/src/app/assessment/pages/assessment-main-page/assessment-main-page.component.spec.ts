import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { of } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { AssessmentListComponent } from '../../components/assessment-list/assessment-list.component';
import { AssessmentService } from '../../services/assessment.service';
import { AssessmentMainPageComponent } from './assessment-main-page.component';

const mockAssessmentService = {
  fetchAssessments: jest.fn().mockReturnValue(of({})),
};

describe('AssessmentMainPageComponent', () => {
  let component: AssessmentMainPageComponent;
  let fixture: ComponentFixture<AssessmentMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoriesModule,
        SharedModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        TypeaheadModule.forRoot(),
      ],
      declarations: [
        AssessmentMainPageComponent,
        AssessmentListComponent,
      ],
      providers: [
        { provide: AssessmentService, useValue: mockAssessmentService },
        {
          provide: Router,
          useValue: {},
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssessmentMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
