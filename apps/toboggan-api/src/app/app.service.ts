import { Injectable } from '@nestjs/common';
import { User } from '@toboggan-ws/toboggan-common'
import { Group } from '@toboggan-ws/toboggan-common'


@Injectable()
export class AppService {


  groups: Group[] = [{
    groupname: 'group1',
    type: 0
  }]
  
  // 
  // some fake test users 
  // 
  users: User[] = [{ 
    username: 'user1', 
    firstname: 'name1', 
    lastname: 'last1', 
    email: 'email1@sada.com',
    groups: this.groups,
   }, { 
    username: 'user2', 
    firstname: 'name2', 
    lastname: 'last2', 
    email: 'email2@sada.com',
    groups: this.groups,
   }
  ];

  // 
  // 
  // 
  getUsers(): User[] {
    return this.users;
  }

  // 
  // create user button
  // 
  createUser() {
    this.users.push({ 
      username: 'user3', 
      firstname: 'name3', 
      lastname: 'last3', 
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

  createGroup() {
    console.log("unimplemented")
  }

  updateGroup(id) {
    console.log("unimplemented")
  }

}