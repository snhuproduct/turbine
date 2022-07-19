import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserTestComponent } from './components/user-test/user-test.component';
import { UserMainPageComponent } from './pages/user-main-page/user-main-page.component';

@NgModule({
  declarations: [UserTestComponent, UserMainPageComponent],
  imports: [CommonModule],
})
export class UserModule {}
