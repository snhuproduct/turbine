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

  users: IUser[] = [
    {
      id: uuidv4(),
      userName: 'user1',
      firstName: 'name1',
      lastName: 'last1',
      email: 'email1@sada.com',
      groups: this.groups,
      enabled: true,
    },
    {
      id: uuidv4(),
      userName: 'user2',
      firstName: 'name2',
      lastName: 'last2',
      email: 'email2@sada.com',
      groups: this.groups,
      enabled: true,
    },
  ];

  getUsers(): IUser[] {
    const paginatedUsers = arrayPaginate(this.users, 0, 10);

    console.log(paginatedUsers);

    return this.users;
  }

  createUser(user: INewUser) {
    this.users.push({
      id: uuidv4(),
      ...user,
    });
  }

  updateUser(id: string, updatedUser: IUser) {
    console.log('updating user');
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

  deleteUser(id: string) {
    this.users = this.users.filter((user) => {
      return user.id !== id;
    });
  }
}