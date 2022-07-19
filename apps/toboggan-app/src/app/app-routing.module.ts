import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMainPageComponent } from './user/pages/user-main-page/user-main-page.component';

const routes: Routes = [{ path: '', component: UserMainPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
