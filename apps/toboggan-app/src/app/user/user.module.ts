import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { SharedModule } from '../shared/shared.module';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserMainPageComponent } from './pages/user-main-page/user-main-page.component';
import { userRouting } from './user.routing';

@NgModule({
  declarations: [UserMainPageComponent, CreateUserComponent, EditUserComponent],
  imports: [
    CommonModule,
    StoriesModule,
    userRouting,
    SharedModule,
    ReactiveFormsModule,
  ],

  exports: [UserMainPageComponent],
})
export class UserModule {}
