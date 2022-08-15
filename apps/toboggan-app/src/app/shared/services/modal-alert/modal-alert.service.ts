import { Injectable } from '@angular/core';
import { IModalAlert } from './modal-alert.types';

@Injectable({
  providedIn: 'root',
})
export class ModalAlertService {
  modalAlert: IModalAlert | null = null;

  public showModalAlert(modalAlert: IModalAlert): void {
    this.modalAlert = {
      ...modalAlert,
      alertCondition: true,
    };
  }

  public hideModalAlert(): void {
    this.modalAlert = null;
  }
}
