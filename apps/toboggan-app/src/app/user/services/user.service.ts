import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroup, IUser } from '@toboggan-ws/toboggan-common';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUser[] = [];
  groups: IGroup[] = [];

  constructor(private http: HttpClient) {
    this.fetchUsers();
    this.fetchGroups();
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
    this.http.get<IUser[]>('/api/users').subscribe((u) => (this.users = u));
  }

  createUser(user: IUser) : Promise<unknown> {
    return firstValueFrom(this.http.post('/api/users', user));
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

  // groups handlers
  fetchGroups() {
    this.http.get<IGroup[]>('/api/groups').subscribe((g) => (this.groups = g));
  }

  // creates users and refetches list (TODO: we need to clarify if we need to refetch list)
  createGroup() {
    this.http.post('/api/groups', {}).subscribe(() => {
      this.fetchGroups();
    });
  }

  // updates user
  updateGroup() {
    this.http.put('/api/groups/:id', {}).subscribe(() => {
      this.fetchGroups();
    });
  }
}
