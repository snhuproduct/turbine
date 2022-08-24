import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGroup, INewGroup } from '@toboggan-ws/toboggan-common';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) { }

  // Fetch all groups
  fetchGroups() {
    return this.http.get<IGroup[]>('/api/groups');
  }

  fetchGroupDetails(id: string) {
    return this.http.get<IGroup>('/api/groups/:' + id);
  }

  // Creates group
  createGroup(group: INewGroup) {
    return this.http.post('/api/groups', group);
  }

  // Updates group
  updateGroup(group: IGroup) {
    return this.http.put('/api/groups/:' + group.id, group);
  }

  // Add user to group
  addUsertoGroup(groupId: string, user: string) {
    return this.http.post('/api/groups/addusertogroup', { groupId, user });
  }

  //Delete group
  async deleteGroup(groupId: string) {
    await firstValueFrom(this.http.delete(`/api/groups/${groupId}`));
  }
}
