import { Injectable } from '@nestjs/common';

import { IGroup, INewUser, IUser } from '@toboggan-ws/toboggan-common';

import * as arrayPaginate from 'array-paginate';

import { v4 as uuidv4 } from 'uuid';

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

  constructor() {
    // generate mocked data for 20 users
    for (let i = 0; i < 20; i++) {
      this.users.push({
        id: uuidv4(),
        userName: `user${i}`,
        firstName: `name${i}`,
        lastName: `last${i}`,
        email: `user-${i}@sada.com`,
        enabled: true,
      });
    }
  }

  getUsers(): IUser[] {
    return this.users;
  }

  getPaginatedUsers(currentPage: number, resultsPerPage = 10) {
    const paginatedUsers = arrayPaginate(
      this.users,
      currentPage,
      resultsPerPage
    );

    return paginatedUsers;
  }

  createUser(user: INewUser) {
    this.users.push({
      id: uuidv4(),
      ...user,
    });
  }

  updateUser(id: string, updatedUser: IUser) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          id: user.id,
          ...updatedUser,
        };
      }
      return user;
    });
  }

  patchUser(id: string, updatedUser: IUser) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
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
      if (user.id === id) {
        return {
          ...user
        };
      }
      return user;
    });
  }

  deleteUser(id: string) {
    this.users = this.users.filter((user) => {
      return user.id !== id;
    });
  }
}
