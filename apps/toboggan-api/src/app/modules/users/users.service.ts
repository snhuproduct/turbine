import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { IGroup, INewUser, IUser } from '@toboggan-ws/toboggan-common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { UserStatus } from './users.types';

import { CreateUserDto, PatchUserDto } from './users.dto';

@Injectable()
export class UsersService {
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
    // generate mocked data for 20 users
    for (let i = 0; i < 20; i++) {
      this.users.push({
        userId: `id-${i}`,
        userName: `user${i}`,
        firstName: `name${i}`,
        lastName: `last${i}`,
        email: `user-${i}@sada.com`,
        enabled: true,
      });
    }
  }
  // dummy implementation  -> until Quantiphi api is verified
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // getUsers(params?: { skip?: number; limit?: number }) {
  //   return this.users;
  // }

  //glidepath api itegrated code -- uncomment after verifying url
  getUsers(params?: {
    skip?: number;
    limit?: number;
  }): Observable<AxiosResponse<IUser[]>> {
    return this.httpService.get('/users', { params });
  }

  createUser(user: INewUser): Observable<AxiosResponse<IUser[]>> {
    return this.httpService.post('/user', user);
  }

  updateUser(id: string, updatedUser: CreateUserDto) {
    this.users = this.users.map((user) => {
      if (user.userId === id) {
        return {
          userId: user.userId,
          ...updatedUser,
        };
      }
      return user;
    });
  }

  patchUser(id: string, updatedUser: PatchUserDto) {
    this.users = this.users.map((user) => {
      if (user.userId === id) {
        return {
          ...user,
          ...updatedUser,
        };
      }
      return user;
    });
  }

  resetPasswordOfUser(id: string) {
    // forward the pwd-reset request to the back-end
    // this does not do anything at the moment
    this.users = this.users.map((user) => {
      if (user.userId === id) {
        return {
          ...user,
        };
      }
      return user;
    });
  }

  deleteUser(id: string) {
    this.users = this.users.filter((user) => {
      return user.userId !== id;
    });
  }

  changeStatusOfUser(id: string, newStatus: UserStatus) {
    console.log('changing status of user', id, 'to ', newStatus);
  }
}
