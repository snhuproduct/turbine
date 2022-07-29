import { Injectable } from '@nestjs/common';
import { IGroup, INewUser, IUser } from '@toboggan-ws/toboggan-common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  groups: IGroup[] = [
    {
      id: uuidv4(),
      groupName: 'group1',
      type: 0,
    },
  ];

  //
  // some fake test users
  //
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

  //TODO: I suggest refactoring both Groups and Users into different providers (Single responsibility principle)

  getGroups() {
    return this.groups;
  }

  createGroup(newGroup: IGroup) {
    this.groups.push(newGroup);
  }

  updateGroup(id: string, updatedGroup: IGroup) {
    this.groups = this.groups.map((group) => {
      if (group.id === id) {
        return {
          id: group.id,
          ...updatedGroup,
        };
      }
      return group;
    });
  }

  patchGroup(id: string, updatedGroup: IGroup) {
    this.groups = this.groups.map((group) => {
      if (group.id === id) {
        return {
          ...group,
          ...updatedGroup,
        };
      }
      return group;
    });
  }

  deleteGroup(id: string) {
    this.groups = this.groups.filter((group) => {
      return group.id !== id;
    });
  }
}
