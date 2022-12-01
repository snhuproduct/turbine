import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private _groupUpdated = new BehaviorSubject<IGroup>({} as IGroup);
  groupUpdated$ = this._groupUpdated.asObservable();
  constructor(private http: HttpClient) {}

  // Fetch all groups
  fetchGroups() {
    return this.http.get<IGroup[]>('/api/groups');
  }

  fetchGroupDetails(uuid: string) {
    return this.http.get<IGroup>('/api/groups/' + uuid);
  }

  // Creates group
  createGroup(group: Partial<IGroup>) {
    return this.http.post('/api/groups', group);
  }

  // Updates group
  async updateGroup(group: Partial<IGroup>, uuid: string) {
    await firstValueFrom(this.http.put('/api/groups/' + uuid, group));
  }

  // Add user to group
  addUsertoGroup(groupId: string, user: string) {
    return this.http.post('/api/groups/addusertogroup', { groupId, user });
  }

  //Delete group
  async deleteGroup(uuid: string) {
    await firstValueFrom(this.http.delete(`/api/groups/${uuid}`));
  }

  publishGroupCompleted(group: IGroup) {
    this._groupUpdated.next(group);
  }
}
