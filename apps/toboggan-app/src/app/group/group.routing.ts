import { RouterModule, Routes } from '@angular/router';
import { GroupDetailsPageComponent } from './pages/group-details-page/group-details-page.component';
import { GroupMainPageComponent } from './pages/group-main-page/group-main-page.component';
import { PendingChangesGuard } from './services/pending-changes.guard';

const groupRoutes: Routes = [
  { path: '', component: GroupMainPageComponent },
  {
    path: 'details/:id',
    component: GroupDetailsPageComponent,
    canDeactivate: [PendingChangesGuard],
  },
];

export const groupRouting = RouterModule.forChild(groupRoutes);
