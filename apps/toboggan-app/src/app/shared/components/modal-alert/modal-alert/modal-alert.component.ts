import { Component } from '@angular/core';
import { ModalAlertService } from '../../../services/modal-alert/modal-alert.service';

@Component({
  selector: 'toboggan-ws-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
export class ModalAlertComponent {
  constructor(public modalAlertService: ModalAlertService) {
    this.modalAlertService.showModalAlert({
      type: 'success',
      heading: 'Success',
      message: 'This is a success message.',
      buttons: [
        {
          title: 'Cancel',
          onClick: () => {
            this.modalAlertService.hideModalAlert();
          },
          style: 'secondary',
        },
        {
          title: 'OK',
          onClick: () => {
            this.modalAlertService.hideModalAlert();
          },
          style: 'primary',
        },
      ],
    });
  }
}
