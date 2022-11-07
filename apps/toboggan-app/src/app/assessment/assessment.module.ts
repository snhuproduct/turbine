import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { assessmentRouting } from './assessment.routing';
import { AssessmentDetailsComponent } from './components/assessment-details/assessment-details.component';
import { FlagAssessmentComponent } from './components/flag-assessment/flag-assessment.component';
import { AssessmentListComponent } from './components/assessment-list/assessment-list.component';
import { AssessmentEvaluatedListComponent } from './components/assessment-evaluated-list/assessment-evaluated-list.component';
import { AssessmentMainPageComponent } from './pages/assessment-main-page/assessment-main-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AssessmentMainPageComponent,
    AssessmentListComponent,
    AssessmentEvaluatedListComponent,
    FlagAssessmentComponent,
    AssessmentDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoriesModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    SharedModule,
    CollapseModule.forRoot(),
    assessmentRouting,
  ],
  exports: [
    AssessmentMainPageComponent,
    AssessmentListComponent,
    AssessmentEvaluatedListComponent,
  ],
})
export class AssessmentModule {}
