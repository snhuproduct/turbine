import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { UserMainPageComponent } from './pages/user-main-page/user-main-page.component';
import { userRouting } from './user.routing';
import { CreateUserComponent } from './components/create-user/create-user.component';

@NgModule({
  declarations: [UserMainPageComponent, CreateUserComponent],
  imports: [CommonModule, StoriesModule, userRouting],
  exports: [UserMainPageComponent],
})
export class UserModule {}
