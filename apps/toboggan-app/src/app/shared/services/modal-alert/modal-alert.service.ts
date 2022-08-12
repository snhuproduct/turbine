import { Injectable } from '@angular/core';
import { IModalAlert } from './modal-alert.types';

@Injectable({
  providedIn: 'root',
})
export class ModalAlertService {
  private modalAlert: IModalAlert | null = null;

  public showModalAlert(modalAlert: IModalAlert): void {
    this.modalAlert = modalAlert;
  }

  public hideModalAlert(): void {
    this.modalAlert = null;
  }
}
