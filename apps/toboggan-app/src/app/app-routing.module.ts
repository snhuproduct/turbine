import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'group',
    loadChildren: () =>
      import('./group/group.module').then((m) => m.GroupModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'assessment',
    loadChildren: () =>
      import('./assessment/assessment.module').then((m) => m.AssessmentModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'permission',
    loadChildren: () =>
      import('./permission/permission.module').then((m) => m.PermissionModule),
    canActivate: [AuthGuard],
  },
  // default page is user, change as we may see fit in the future
  { path: '**', redirectTo: '/user' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
