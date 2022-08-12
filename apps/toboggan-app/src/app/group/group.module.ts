import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AddUsersComponent } from './components/add-users/add-users.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { groupRouting } from './group.routing';
import { GroupMainPageComponent } from './pages/group-main-page/group-main-page.component';

@NgModule({
  declarations: [
    GroupMainPageComponent,
    CreateGroupComponent,
    AddUsersComponent,
    GroupListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoriesModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    groupRouting,
  ],
  exports: [
    GroupMainPageComponent,
    CreateGroupComponent,
    AddUsersComponent,
    GroupListComponent,
  ],
})
export class GroupModule {}
