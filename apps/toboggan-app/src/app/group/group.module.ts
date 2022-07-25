import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { groupRouting } from './group.routing';
import { GroupMainPageComponent } from './pages/group-main-page/group-main-page.component';

@NgModule({
  declarations: [
    GroupMainPageComponent,
    CreateGroupComponent,
  ],
  imports: [CommonModule, StoriesModule, groupRouting],
  exports: [GroupMainPageComponent,CreateGroupComponent],
})
export class GroupModule {}
