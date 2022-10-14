import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth/auth.service';

@Component({
  selector: 'toboggan-ws-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private auth: AuthService, public router: Router) {}

  signinWithGoogle() {
    this.auth.ssoAuth();
  }
}
