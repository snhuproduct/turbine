import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {

  constructor(private readonly httpService: HttpService) {
  }

  sendPasswordResetEmail(email: string) {
    return this.httpService.post(`/send-password-reset-email`, {"email": email})
  }


}
