import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { IGroup, IUser } from '@toboggan-ws/toboggan-common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthenticationService {
  private groups: IGroup[] = [
    {
      id: uuidv4(),
      name: 'group1',
      type: 0,
      description: '',
    },
  ];

  users: IUser[] = [];

  constructor(private readonly httpService: HttpService) {
  }

  sendPasswordResetEmail(email: string) {
    return this.httpService.post(`/send-password-reset-email`, {"email": email})
  }


}
