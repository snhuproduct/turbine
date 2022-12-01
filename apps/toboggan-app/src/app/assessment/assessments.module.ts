import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SharedModule } from '../shared/shared.module';
import { assessmentsRouting } from './assessments.routing';
import { AssessmentEvaluatedListComponent } from './components/assessment-evaluated-list/assessment-evaluated-list.component';
import { AssessmentListComponent } from './components/assessment-list/assessment-list.component';
import { AssessmentSubmissionDetailsComponent } from './components/assessment-submission-details/assessment-submission-details.component';
import { FlagAssessmentComponent } from './components/flag-assessment/flag-assessment.component';
import { AssessmentMainPageComponent } from './pages/assessment-main-page/assessment-main-page.component';
import { AssessmentsDetailPageComponent } from './pages/assessments-detail-page/assessments-detail-page.component';

@NgModule({
  declarations: [
    AssessmentMainPageComponent,
    AssessmentListComponent,
    FlagAssessmentComponent,
    AssessmentsDetailPageComponent,
    AssessmentSubmissionDetailsComponent,
    AssessmentEvaluatedListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoriesModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    SharedModule,
    CollapseModule.forRoot(),
    assessmentsRouting,
  ],
  exports: [
    AssessmentMainPageComponent,
    AssessmentListComponent,
    AssessmentEvaluatedListComponent,
  ],
})
export class AssessmentsModule {}
