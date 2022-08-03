import { Injectable } from '@nestjs/common';
import { IAddUsertoGroup, IGroup } from '@toboggan-ws/toboggan-common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GroupsService {
  groups: IGroup[] = [
    {
      id: uuidv4(),
      name: 'group1',
      type: 0,
      description: '',
    },
  ];

  getGroups() {
    return this.groups;
  }

  createGroup(newGroup: IGroup) {
    this.groups.push(newGroup);
  }

  updateGroup(id: string, updatedGroup: IGroup) {
    this.groups = this.groups.map((group) => {
      if (group.id === id) {
        return {
          id: group.id,
          ...updatedGroup,
        };
      }
      return group;
    });
  }

  patchGroup(id: string, updatedGroup: IGroup) {
    this.groups = this.groups.map((group) => {
      if (group.id === id) {
        return {
          ...group,
          ...updatedGroup,
        };
      }
      return group;
    });
  }

  deleteGroup(id: string) {
    this.groups = this.groups.filter((group) => {
      return group.id !== id;
    });
  }

  addUsersToGroup(request: IAddUsertoGroup) {
    console.log(request);
  }
}
