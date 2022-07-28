import { Injectable } from '@nestjs/common';
import { IGroup, IUser } from '@toboggan-ws/toboggan-common';

@Injectable()
export class AppService {
  groups: IGroup[] = [
    {
      groupName: 'group1',
      type: 0,
    },
  ];

  //
  // some fake test users
  //
  users: IUser[] = [
    {
      userName: 'user1',
      firstName: 'name1',
      lastName: 'last1',
      email: 'email1@sada.com',
      groups: this.groups,
    },
    {
      userName: 'user2',
      firstName: 'name2',
      lastName: 'last2',
      email: 'email2@sada.com',
      groups: this.groups,
    },
  ];

  getUsers(): IUser[] {
    return this.users;
  }

  //
  // create user button
  //
  createUser() {
    this.users.push({
      userName: 'user3',
      firstName: 'name3',
      lastName: 'last3',
      email: 'email3@sada.com',
      groups: this.groups,
    });
  }

  updateUser(id) {
    console.log('unimplemented');
  }

  enableUser(id) {
    console.log('unimplemented');
  }

  disableUser(id) {
    console.log('unimplemented');
  }

  getGroups() {
    return this.groups;
  }

  createGroup() {
    console.log('unimplemented');
  }

  updateGroup(id) {
    console.log('unimplemented');
  }
}
