import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoriesModule } from '@snhuproduct/toboggan-ui-components-library';
import { BannerComponent } from './components/banner/banner.component';
import { FormChangesTableComponent } from './components/form-changes-table/form-changes-table.component';
import { ModalAlertComponent } from './components/modal-alert/modal-alert/modal-alert.component';
import { ModalComponent } from './components/modal/modal.component';
import { ErrorMessageDirective } from './error-message/error-message.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  declarations: [
    BannerComponent,
    ModalAlertComponent,
    SafeHtmlPipe,
    FormChangesTableComponent,
    ModalComponent,
    ErrorMessageDirective,
  ],
  imports: [CommonModule, StoriesModule],
  exports: [
    CommonModule,
    BannerComponent,
    ModalComponent,
    StoriesModule,
    FormChangesTableComponent,
    ModalAlertComponent,
    ErrorMessageDirective,
  ],
})
export class SharedModule {}
