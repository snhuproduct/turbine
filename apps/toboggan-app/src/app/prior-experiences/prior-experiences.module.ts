import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { SharedModule } from '../shared/shared.module';
import { PriorExperiencesMainPageComponent } from './pages/prior-experiences-main-page/prior-experiences-main-page.component';
import { PriorExperiencesRoutingModule } from './prior-experiences-routing.module';
import { OnboardingComponent } from './components/onboarding/onboarding.component';


@NgModule({
  declarations: [
    PriorExperiencesMainPageComponent,
    OnboardingComponent
  ],
  imports: [
    CommonModule,
    PriorExperiencesRoutingModule,
    StoriesModule,
    SharedModule
  ],
  exports: [PriorExperiencesMainPageComponent]
})
export class PriorExperiencesModule { }
