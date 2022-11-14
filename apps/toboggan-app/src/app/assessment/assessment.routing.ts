import { RouterModule, Routes } from '@angular/router';
import { AssessmentMainPageComponent } from './pages/assessment-main-page/assessment-main-page.component';

const assessmentRoutes: Routes = [
  { path: '', component: AssessmentMainPageComponent },
];

export const assessmentRouting = RouterModule.forChild(assessmentRoutes);
