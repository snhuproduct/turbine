import { RouterModule, Routes } from '@angular/router';
import { AssessmentDetailsComponent } from './components/assessment-details/assessment-details.component';
import { AssessmentMainPageComponent } from './pages/assessment-main-page/assessment-main-page.component';

const assessmentRoutes: Routes = [
  { path: '', component: AssessmentMainPageComponent },
  { path: 'details/:id', component: AssessmentDetailsComponent }
];

export const assessmentRouting = RouterModule.forChild(assessmentRoutes);
