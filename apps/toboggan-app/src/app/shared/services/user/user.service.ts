import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IGroup,
  INewUser, IUser
} from '@toboggan-ws/toboggan-common';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUser[] = [];
  groups: IGroup[] = [];

  editingUser: IUser | undefined;
  private _userUpdated = new BehaviorSubject<IUser>({} as IUser);
  userUpdated$ = this._userUpdated.asObservable();

  constructor(private http: HttpClient) {}

  fetchUsers() {
    return this.http.get<IUser[]>(`/api/users`);
  }

  fetchPaginatedUsers(currentPage: number, resultsPerPage: number = 10) {
    return this.http.get<IUser[]>(
      `/api/users?currentPage=${currentPage}&resultsPerPage=${resultsPerPage}`
    );
  }

  async createUser(user: INewUser): Promise<unknown> {
    return firstValueFrom(this.http.post('/api/users', user));
  }

  async resetPassword(userId: string): Promise<unknown> {
    return firstValueFrom(
      this.http.put(`/api/users/${userId}/password`, { type: 'reset' })
    );
  }

  async updateUser(updatedUser: Partial<IUser>, userId: string): Promise<void> {
    await firstValueFrom(this.http.put(`/api/users/${userId}`, updatedUser));
  }

  async patchUser(patchUser: Partial<IUser>, userId: string): Promise<void> {
    await firstValueFrom(this.http.patch(`/api/users/${userId}`, patchUser));
    this.fetchUsers();
  }

  setEditingUser(user: IUser) {
    this.editingUser = user;
  }

  publishUserEditComplete(user: IUser) {
    this._userUpdated.next(user);
  }
}
