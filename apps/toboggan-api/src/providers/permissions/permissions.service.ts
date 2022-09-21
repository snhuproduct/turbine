import { Injectable } from '@nestjs/common';
import {
  IGroup,
  INewPermission,
  IPermission,
} from '@toboggan-ws/toboggan-common';
import * as arrayPaginate from 'array-paginate';

@Injectable()
export class PermissionService {
  private permissions: IPermission[] = [];
  private groups: IGroup[] = [];
  private accessLevels = [
    'View',
    'Create',
    'Edit',
    'Reset Password',
    'Activate/Deactivate',
    'Archive',
    'Change Color',
    'Publish',
  ];
  private modules = [
    'User',
    'User Groups',
    'Permissions',
    'Learning Resource',
    'Content Object',
    'Learning Experience',
    'Assessment Item',
  ];

  constructor() {
    const groupList = [
      'Content Management',
      'Content Authoring',
      'Assessment Authoring',
    ];
    // generate mocked data for 20 users
    for (let i = 0, j = 0, k = 0, m = 0; i < 20; i++) {
      if (j == this.accessLevels.length) j = 0;
      if (k == this.modules.length) k = 0;
      if (m == groupList.length) m = 0;
      const group = {
        id: `group-id-${i}`,
        name: groupList[m],
        description: '',
      };
      this.permissions.push({
        id: `id-${i}`,
        application: 'Application Admin',
        module: this.modules[k],
        accessLevel: this.accessLevels[j],
        userGroups: [group],
      });
      j++;
      k++;
      m++;
    }
  }

  getPermissions() {
    return this.permissions;
  }

  getPaginatedPermissions(currentPage: number, resultsPerPage = 10): IGroup[] {
    const paginatedPermissions = arrayPaginate(
      this.groups,
      currentPage,
      resultsPerPage
    );

    return paginatedPermissions;
  }

  getPermission(id: string) {
    return this.permissions.find(
      (permission: IPermission) => permission.id == id
    );
  }

  createPermission(permission: INewPermission) {
    this.permissions.push({
      id: `id-${this.permissions.length}`,
      ...permission,
    });
  }

  updatePermission(id: string, updatedPermission: IPermission) {
    this.permissions = this.permissions.map((permission) => {
      if (permission.id === id) {
        return {
          id: permission.id,
          ...updatedPermission,
        };
      }
      return permission;
    });
  }

  deletePermission(id: string) {
    this.permissions = this.permissions.filter(
      (permission) => permission.id !== id
    );
  }
}
