import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { BannerComponent } from './components/banner/banner.component';
import { FormChangesTableComponent } from './components/form-changes-table/form-changes-table.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    BannerComponent,
    ModalComponent,
    FormChangesTableComponent,
  ],
  imports: [CommonModule, StoriesModule],
  exports: [
    CommonModule,
    BannerComponent,
    ModalComponent,
    StoriesModule,
    FormChangesTableComponent,
  ],
})
export class SharedModule { }
