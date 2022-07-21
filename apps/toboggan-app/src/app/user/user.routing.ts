import { RouterModule, Routes } from '@angular/router';
import { UserMainPageComponent } from './pages/user-main-page/user-main-page.component';

const userRoutes: Routes = [{ path: '', component: UserMainPageComponent }];

export const userRouting = RouterModule.forChild(userRoutes);
