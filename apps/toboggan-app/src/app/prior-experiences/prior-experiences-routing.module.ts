import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriorExperiencesMainPageComponent } from './pages/prior-experiences-main-page/prior-experiences-main-page.component';

const priorExpRoutes: Routes = [{ path: '', component: PriorExperiencesMainPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(priorExpRoutes)],
  exports: [RouterModule]
})
export class PriorExperiencesRoutingModule { }
