import { Injectable } from '@nestjs/common';
import { IAddUserToGroup, IGroup } from '@toboggan-ws/toboggan-common';
import * as arrayPaginate from 'array-paginate';

@Injectable()
export class GroupsService {
  groups: IGroup[] = [];
  group: IGroup;

  constructor() {
    for (let i = 0; i < 20; i++) {
      this.groups.push({
        id: `group-id-${i}`,
        name: `Group name ${i}`,
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.`,
      });
    }
    this.group = this.groups[0];
  }

  getGroups(): IGroup[] {
    return this.groups;
  }

  getGroup(): IGroup {
    return this.group;
  }

  getPaginatedGroups(currentPage: number, resultsPerPage = 10): IGroup[] {
    const paginatedGroups = arrayPaginate(
      this.groups,
      currentPage,
      resultsPerPage
    );

    return paginatedGroups;
  }

  createGroup(newGroup: IGroup) {
    const newId = this.groups.length + 1;
    newGroup.id = newId as unknown as string;
    this.groups.push(newGroup);
    return newGroup;
  }

  updateGroup(id: string, updatedGroup: IGroup) {
    console.log(updatedGroup);
    this.groups = this.groups.map((group) => {
      console.log('<', group.id, '>=<', id, '>');
      if (group.id === id) {
        console.log({
          id: group.id,
          ...updatedGroup,
        });
        return {
          id: group.id,
          ...updatedGroup,
        };
      }
      return group;
    });
    // console.log(this.groups);
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
    this.groups = this.groups.filter((group) => group.id !== id);
  }

  addUsersToGroup(request: IAddUserToGroup) {
    console.log(request);
  }
}
