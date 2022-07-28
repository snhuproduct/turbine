import { Injectable } from '@nestjs/common';
import { IGroup, IUser } from '@toboggan-ws/toboggan-common';


@Injectable()
export class AppService {


  groups: IGroup[] = [{
    groupName: 'group1',
    type: 0
  }]
  
  // 
  // some fake test users 
  // 
  users: IUser[] = [{ 
    firstName: 'name1', 
    lastName: 'last1', 
    email: 'email1@sada.com',
    groups: this.groups,
   }, { 
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

  createUser(user: IUser) {
    this.users.push(user);
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

  createGroup() {
    console.log("unimplemented")
  }

  updateGroup(id) {
    console.log("unimplemented")
  }

}