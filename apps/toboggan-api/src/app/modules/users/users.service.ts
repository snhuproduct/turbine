import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { UserType } from '@toboggan-ws/toboggan-common';
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
    console.log('searching user with email', email);
    return this.httpService.get(`/user/search`, {
      params: {
        email,
      },
    });
  }

  createUser(user: ICreateUser) {
    return this.httpService.post('/user', user);
  }

  // updateUser(id: string, updatedUser: CreateUserDto) {
  //   this.users = this.users.map((user) => {
  //     if (user.userId === id) {
  //       return {
  //         userId: user.userId,
  //         ...updatedUser,
  //       };
  //     }
  //     return user;
  //   });
  // }

  // patchUser(id: string, updatedUser: PatchUserDto) {
  //   this.users = this.users.map((user) => {
  //     if (user.userId === id) {
  //       return {
  //         ...user,
  //         ...updatedUser,
  //       };
  //     }
  //     return user;
  //   });
  // }

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

  // deleteUser(id: string) {
  //   this.users = this.users.filter((user) => {
  //     return user.userId !== id;
  //   });
  // }

  changeStatusOfUser(id: string, newStatus: UserStatus) {
    console.log('changing status of user', id, 'to ', newStatus);
  }
}
