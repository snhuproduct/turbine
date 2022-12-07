import { RouterModule, Routes } from '@angular/router';
import { AssessmentMainPageComponent } from './pages/assessment-main-page/assessment-main-page.component';
import { AssessmentsDetailPageComponent } from './pages/assessments-detail-page/assessments-detail-page.component';

const assessmentsRoutes: Routes = [
  { path: '', component: AssessmentMainPageComponent },
  {
    path: 'details/:uuid',
    component: AssessmentsDetailPageComponent,
  },
];

export const assessmentsRouting = RouterModule.forChild(assessmentsRoutes);
