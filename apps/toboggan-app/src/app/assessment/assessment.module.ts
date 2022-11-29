import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SharedModule } from '../shared/shared.module';
import { assessmentRouting } from './assessment.routing';
import { AssessmentDetailsComponent } from './components/assessment-details/assessment-details.component';
import { AssessmentListComponent } from './components/assessment-list/assessment-list.component';
import { FlagAssessmentComponent } from './components/flag-assessment/flag-assessment.component';
import { AssessmentMainPageComponent } from './pages/assessment-main-page/assessment-main-page.component';

@NgModule({
  declarations: [
    AssessmentMainPageComponent,
    AssessmentListComponent,
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
  exports: [AssessmentMainPageComponent, AssessmentListComponent],
})
export class AssessmentModule {}
