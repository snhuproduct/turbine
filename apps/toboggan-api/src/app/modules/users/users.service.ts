import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { UserType } from '@toboggan-ws/toboggan-common';
import { map } from 'rxjs';
import { UpdateStatusDTO, UpdateUserDTO } from './users.dto';
import { ICreateUser, UserStatus } from './users.types';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  getUsers(skip: number, limit: number, userType?: UserType) {
    return this.httpService.get('/users', {
      params: {
        skip,
        limit,
        user_type: userType,
      },
    });
  }

  getUser(id: string) {
    return this.httpService.get(`/user/${id}`);
  }

  searchUser(email: string) {
    return this.httpService.get(`/user/search`, {
      params: {
        email,
      },
    });
  }

  createUser(user: ICreateUser) {
    return this.httpService.post('/user', user);
  }

  updateUser(id: string, user: UpdateUserDTO) {
    return this.httpService.put(`/user/${id}`, user);
  }

  updateStatus(id: string, updateStatus: UpdateStatusDTO) {
    return this.httpService.put(`/user/${id}`, updateStatus);
  }

  deleteUser(id: string) {
    return this.httpService.delete(`/user/${id}`);
  }

  canLogin(email: string) {
    return this.searchUser(email).pipe(
      map((response) => {
        const user = response.data.data[0];

        if (user.status === UserStatus.Active) {
          return true;
        }

        return false;
      })
    );
  }

  // resetPasswordOfUser(id: string) {
  //   // forward the pwd-reset request to the back-end
  //   // this does not do anything at the moment
  //   this.users = this.users.map((user) => {
  //     if (user.userId === id) {
  //       return {
  //         ...user,
  //       };
  //     }
  //     return user;
  //   });
  // }
}
