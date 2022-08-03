import { RouterModule, Routes } from '@angular/router';
import { GroupDetailsPageComponent } from './pages/group-details-page/group-details-page.component';
import { GroupMainPageComponent } from './pages/group-main-page/group-main-page.component';

const groupRoutes: Routes = [
    { path: '', component: GroupMainPageComponent },
    { path: 'details', component: GroupDetailsPageComponent }];

export const groupRouting = RouterModule.forChild(groupRoutes);
