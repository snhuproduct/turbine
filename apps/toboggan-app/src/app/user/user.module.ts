import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { UserMainPageComponent } from './pages/user-main-page/user-main-page.component';

@NgModule({
  declarations: [UserMainPageComponent],
  imports: [CommonModule, StoriesModule],
  exports: [UserMainPageComponent],
})
export class UserModule {}
