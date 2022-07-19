import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Group } from '@toboggan-ws/toboggan-common'


@Component({
  selector: 'toboggan-ws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: User[] = [];
  groups: Group[] = [];

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
    this.http.get<User[]>('/api/users').subscribe((u) => (this.users = u));
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


  // groups handlers 
  fetchGroups() {
    this.http.get<Group[]>('/api/groups').subscribe((g) => (this.groups = g));
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