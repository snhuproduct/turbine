import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IGroup,
  INewUser,
  IUpdatedUser,
  IUser,
} from '@toboggan-ws/toboggan-common';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUser[] = [];
  groups: IGroup[] = [];

  constructor(private http: HttpClient) {}

  // user handlers

  //
  // TODO: split this into "managers" so all main logic is there:
  //  - UserManager
  //  - GroupManager
  //  - etc.
  //
  //

  fetchUsers() {
    return this.http.get<IUser[]>(`/api/users`);
  }

  fetchPaginatedUsers(currentPage: number, resultsPerPage: number = 10) {
    return this.http.get<IUser[]>(
      `/api/users?currentPage=${currentPage}&resultsPerPage=${resultsPerPage}`
    );
  }

  createUser(user: INewUser): Promise<unknown> {
    return firstValueFrom(this.http.post('/api/users', user));
  }

  // updates user
  updateUser(updatedUser: IUpdatedUser, userId: string): void {
    console.log(`Updating user ID ${userId}`, updatedUser);
    this.http.put(`/api/users/${userId}`, updatedUser).subscribe(() => {
      this.fetchUsers();
    });
  }
}
