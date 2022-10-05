import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SharedModule } from '../shared/shared.module';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { groupRouting } from './group.routing';
import { GroupDetailsPageComponent } from './pages/group-details-page/group-details-page.component';
import { GroupMainPageComponent } from './pages/group-main-page/group-main-page.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { PermissionComponent } from './components/permission/permission.component';
import { AddPermissionComponent } from './components/add-permission/add-permission.component';

@NgModule({
  declarations: [
    GroupMainPageComponent,
    CreateGroupComponent,
    AddUsersComponent,
    GroupListComponent,
    GroupDetailsPageComponent,
    ListUsersComponent,
    EditGroupComponent,
    PermissionComponent,
    AddPermissionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoriesModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    SharedModule,
    groupRouting,
  ],
  exports: [
    GroupMainPageComponent,
    CreateGroupComponent,
    AddUsersComponent,
    GroupListComponent,
    GroupDetailsPageComponent,
    ListUsersComponent,
  ],
})
export class GroupModule {}
