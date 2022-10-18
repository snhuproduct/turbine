/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { getAuth, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { JWTToken } from 'libs/jwttoken/jwttoken';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get AuthBearerToken(): string | undefined {
    if (!this.isSignedIn()) {
      return '';
    }
    return this.jwtSso?.jwtToken;
  }

  app = firebase.initializeApp(environment.firebase);
  auth = getAuth(this.app);
  userData: unknown;
  private ssoIdToken = localStorage.getItem('ssoIdToken') ?? '';
  private jwtSso = this.ssoIdToken ? new JWTToken(this.ssoIdToken) : null;
  private gpIdToken = localStorage.getItem('gpIdToken') ?? '';
  private jwtGp = this.gpIdToken ? new JWTToken(this.gpIdToken) : null;
  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
      }
      if (!this.isSignedIn()) {
        this.signOut();
      }
      [this.jwtSso, this.jwtGp].map((jwt) => {
        if (jwt) jwt?.decodeToken();
      });
      this.refreshTokensJwts();
    });
  }

  // TODO
  // We'll need more work here in the future to refresh the user token if there's been activity in the session recently
  ssoAuth = async () => {
    const provider = new OAuthProvider(environment.providerID);
    return await signInWithPopup(this.auth, provider)
      .then(async (result) => {
        const credential = OAuthProvider.credentialFromResult(result);
        if (credential !== null) {
          const idToken = credential.idToken ?? '';
          this.setSsoTokenJwt(idToken);
          if (!environment.production) {
            console.log(
              `idTokenSSO-poc\n%c${localStorage.getItem('jwtSso')}`,
              'color:pink'
            );
            const jwtSsoObj = JSON.parse(
              localStorage.getItem('jwtSso') ?? `{'jwtToken':''}`
            );
            this.setCookie('firebaseIdToken', jwtSsoObj['jwtToken']);

            this.router.navigate(['']);
          }
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  removeTokenJwts() {
    [this.ssoIdToken, this.gpIdToken, this.jwtSso, this.jwtGp] = [
      '',
      '',
      null,
      null,
    ];
    ['jwtSso', 'jwtGp', 'gpIdToken', 'ssoIdToken'].map((key) =>
      localStorage.removeItem(key)
    );
  }

  refreshTokensJwts() {
    this.ssoIdToken = localStorage.getItem('ssoIdToken') ?? '';
    this.jwtSso = this.ssoIdToken ? new JWTToken(this.ssoIdToken) : null;
    this.jwtSso?.decodeToken();
    if (this.jwtSso)
      localStorage.setItem('jwtSso', JSON.stringify(this.jwtSso));
  }

  setSsoTokenJwt(ssoIdToken: string) {
    localStorage.setItem('ssoIdToken', ssoIdToken);
    const jwtSsoObj = new JWTToken(ssoIdToken);
    jwtSsoObj.decodeToken();
    localStorage.setItem('jwtSso', JSON.stringify(jwtSsoObj, null, 2));
  }

  // should only be used in dev mode to work with postman interceptor
  setCookie(name: string, val: string): void {
    const expiryDate = new Date();
    // 1 hour validity
    expiryDate.setTime(expiryDate.getTime() + 3600);
    const ck = `${name}=${val}; expires=${expiryDate.toUTCString()}; SameSite=None; SameSite=Secure; path=/`;
    document.cookie = ck;
  }

  signOut() {
    this.auth.signOut().then(() => {
      this.removeTokenJwts();
      this.router.navigate(['login']);
    });
  }

  // TODO
  // can probably be done better using the observable provided in firebase
  // will revisit
  isSignedIn(): boolean {
    if (!this.jwtSso) this.refreshTokensJwts();
    return this.jwtSso !== null && !this.jwtSso.isTokenExpired();
  }
}
