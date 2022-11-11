import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { SharedModule } from '../shared/shared.module';
import { PermissionsListComponent } from './components/permissions-list/permissions-list.component';
import { PermissionsMainPageComponent } from './pages/permissions-main-page/permissions-main-page.component';
import { PermissionRoutingModule } from './permission-routing.module';

@NgModule({
  declarations: [PermissionsMainPageComponent, PermissionsListComponent],
  imports: [CommonModule, StoriesModule, SharedModule, PermissionRoutingModule],
  exports: [PermissionsMainPageComponent, PermissionsListComponent],
})
export class PermissionModule {}
