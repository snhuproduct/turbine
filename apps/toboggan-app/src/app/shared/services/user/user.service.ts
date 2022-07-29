import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroup, IUser } from '@toboggan-ws/toboggan-common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUser[] = [];
  groups: IGroup[] = [];

  constructor(private http: HttpClient) {
    this.fetchUsers();
  }

  // user handlers

  //
  // TODO: split this into "managers" so all main logic is there:
  //  - UserManager
  //  - GroupManager
  //  - etc.
  //
  //

  fetchUsers() {
    return this.http.get<IUser[]>('/api/users');
  }

  // creates users and refetches list (TODO: we need to clarify if we need to refetch list)
  createUser() {
    this.http.post('/api/users', {}).subscribe(() => {
      this.fetchUsers();
    });
  }

  // updates user
  updateUser() {
    this.http.put('/api/users/:id', {}).subscribe(() => {
      this.fetchUsers();
    });
  }

  //
  enableUser() {
    this.http.put('/api/users/:id/enable/', {}).subscribe(() => {
      this.fetchUsers();
    });
  }

  //
  disableUser() {
    this.http.put('/api/users/:id/disable', {}).subscribe(() => {
      this.fetchUsers();
    });
  }

    
}
