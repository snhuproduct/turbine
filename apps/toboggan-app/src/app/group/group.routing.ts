import { RouterModule, Routes } from '@angular/router';
import { GroupMainPageComponent } from './pages/group-main-page/group-main-page.component';

const groupRoutes: Routes = [{ path: '', component: GroupMainPageComponent }];

export const groupRouting = RouterModule.forChild(groupRoutes);
