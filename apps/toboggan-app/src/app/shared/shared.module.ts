import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { BannerComponent } from './components/banner/banner.component';
import { ModalAlertComponent } from './components/modal-alert/modal-alert/modal-alert.component';

@NgModule({
  declarations: [BannerComponent, ModalAlertComponent],
  imports: [CommonModule, StoriesModule],
  exports: [CommonModule, BannerComponent, ModalAlertComponent, StoriesModule],
})
export class SharedModule {}
