import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ModalAlertService } from '../services/modal-alert/modal-alert.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router,
    private modalAlert: ModalAlertService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isSignedIn !== true) {
      this.modalAlert.showModalAlert({
        type: 'error',
        heading: 'Access Denied',
        message: 'Sorry, you must login to access this page.',
        buttons: [
          {
            title: 'Ok',
            onClick: () => {
              this.modalAlert.hideModalAlert();
              this.router.navigate(['/login']);
            },
            style: 'primary',
          },
        ],
      });
    }

    return true;
  }
}
