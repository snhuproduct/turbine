import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { UserTestComponent } from './components/user-test/user-test.component';
import { UserMainPageComponent } from './pages/user-main-page/user-main-page.component';

@NgModule({
  declarations: [UserTestComponent, UserMainPageComponent],
  imports: [CommonModule, StoriesModule],
  exports: [UserTestComponent, UserMainPageComponent],
})
export class UserModule {}
