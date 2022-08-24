import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IGroup,
  INewUser,
  IUpdatedUser,
  IUser
} from '@toboggan-ws/toboggan-common';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUser[] = [];
  groups: IGroup[] = [];

  constructor(private http: HttpClient) { }

  fetchUsers() {
    return this.http.get<IUser[]>(`/api/users`);
  }

  fetchPaginatedUsers(currentPage: number, resultsPerPage: number = 10) {
    return this.http.get<IUser[]>(
      `/api/users?currentPage=${currentPage}&resultsPerPage=${resultsPerPage}`);
  }

  async createUser(user: INewUser): Promise<unknown> {
    return firstValueFrom(this.http.post('/api/users', user));
  }

  async resetPassword(userId: string): Promise<unknown> {
    // TODO: endpoint for reset password
    // back-end doesn't have an endpoint to reset password yet; doing dummy GET
    return firstValueFrom(this.http.get(`/api/users?id=${userId}`));
  }

  async updateUser(updatedUser: IUpdatedUser, userId: string): Promise<void> {
    await firstValueFrom(this.http.put(`/api/users/${userId}`, updatedUser));
    this.fetchUsers();
  }
}
