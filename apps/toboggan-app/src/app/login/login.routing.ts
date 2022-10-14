import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page.component';

const loginRoutes: Routes = [{ path: '', component: LoginPageComponent }];

export const loginRouting = RouterModule.forChild(loginRoutes);
