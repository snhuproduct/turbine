import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ModalAlertService } from '../../shared/services/modal-alert/modal-alert.service';

export interface IComponentCanDeactivate {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canDeactivate: (event?: any) => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class PendingChangesGuard
  implements CanDeactivate<IComponentCanDeactivate>
{
  canLeave$ = new Subject<boolean>();

  constructor(private modalAlertService: ModalAlertService) {}

  canDeactivate(
    component: IComponentCanDeactivate
  ): boolean | Observable<boolean> {
    if (!component.canDeactivate()) {
      this.confirmUserAction();
    }
    return component.canDeactivate() ? true : this.canLeave$;
  }

  confirmUserAction() {
    this.modalAlertService.showModalAlert({
      type: 'warning',
      heading: `Leave this page?`,
      message: `If you leave, your changes won’t be saved. `,
      buttons: [
        {
          title: 'No, continue editing',
          onClick: () => {
            console.log('no');
            this.modalAlertService.hideModalAlert();
            this.canLeave$.next(false);
          },
          style: 'secondary',
        },
        {
          title: 'Yes, leave page',
          onClick: () => {
            this.modalAlertService.hideModalAlert();
            this.canLeave$.next(true);
            console.log('yes ');
          },
          style: 'primary',
        },
      ],
    });
  }
}
