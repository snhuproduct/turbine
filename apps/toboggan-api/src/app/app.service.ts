import { Injectable } from '@nestjs/common';
import { IGroup, IUser } from '@toboggan-ws/toboggan-common';

export interface IAddUsertoGroup {
  groupId: string;
  email: string;
}

@Injectable()
export class AppService {


  groups: IGroup[] = [{
    groupId: '2AE9GWE5E1A9',
    name: 'Admin',
    type: 0,
    description: ''
  }] 
  
  // 
  // some fake test users 
  // 
  users: IUser[] = [{ 
    username: 'user1', 
    firstName: 'name1', 
    lastName: 'last1', 
    email: 'email1@sada.com',
    groups: this.groups,
   }, { 
    username: 'user2', 
    firstName: 'name2', 
    lastName: 'last2', 
    email: 'email2@sada.com',
    groups: this.groups,
   }
  ];

  // 
  // 
  // 
  getUsers(): IUser[] {
    return this.users;
  }

  // 
  // create user button
  // 
  createUser() {
    this.users.push({ 
      username: 'user3', 
      firstName: 'name3', 
      lastName: 'last3', 
      email: 'email3@sada.com',
      groups: this.groups,
     });
  }

  updateUser(id) {
    console.log("unimplemented")
  }

  enableUser(id) {
    console.log("unimplemented")
  }

  disableUser(id) {
    console.log("unimplemented")
  }

  getGroups() {
    return this.groups;
  }

  createGroup(group) {
    console.log(group);
  }

  updateGroup(id) {
    console.log("unimplemented")
  }

  addUserstoGroup(requestBody) {
    console.log(requestBody);
  }

}