import jwt_decode from 'jwt-decode';

export interface IDecodedToken {
  [key: string]: string;
}

export class JWTToken {
  jwtToken = '';
  private decodedToken: IDecodedToken = {};

  constructor(token: string) {
    this.jwtToken = token;
  }

  setToken(token: string): string {
    if (token) {
      this.jwtToken = token;
    }
    return this.jwtToken;
  }

  decodeToken(): IDecodedToken {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
    return this.decodedToken;
  }

  getDecodeToken() {
    return this.decodeToken;
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['displayname'] : null;
  }

  getEmailId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['email'] : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : '0';
  }

  isTokenExpired(): boolean {
    const expiryTime: number = parseInt(this.getExpiryTime());
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }
}
