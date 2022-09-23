import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsMainPageComponent } from './pages/permissions-main-page/permissions-main-page.component';

const routes: Routes = [{ path: '', component: PermissionsMainPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionRoutingModule {}
