import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { SharedModule } from '../shared/shared.module';
import { UserMainPageComponent } from './pages/user-main-page/user-main-page.component';
import { userRouting } from './user.routing';

@NgModule({
  declarations: [UserMainPageComponent],
  imports: [CommonModule, StoriesModule, userRouting, SharedModule],
  exports: [UserMainPageComponent],
})
export class UserModule {}
