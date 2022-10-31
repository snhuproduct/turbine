import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { AssessmentListComponent } from './components/assessment-list/assessment-list.component';
import { AssessmentMainPageComponent } from './pages/assessment-main-page/assessment-main-page.component';
import { assessmentRouting } from './assessment.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AssessmentMainPageComponent,
    AssessmentListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoriesModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    SharedModule,
    assessmentRouting,
  ],
  exports: [
    AssessmentMainPageComponent,
    AssessmentListComponent,
  ],
})
export class AssessmentModule {}
