import { Component } from '@angular/core';
import { ModalAlertService } from '../../../services/modal-alert/modal-alert.service';

@Component({
  selector: 'toboggan-ws-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
export class ModalAlertComponent {
  constructor(public modalAlertService: ModalAlertService) {}
}
