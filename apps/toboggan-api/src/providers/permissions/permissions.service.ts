import { Injectable } from '@nestjs/common';
import {
  IGroup,
  INewPermission,
  IPermission,
} from '@toboggan-ws/toboggan-common';
import * as arrayPaginate from 'array-paginate';
import { mockPermissions } from './permissions.mock';

@Injectable()
export class PermissionService {
  private permissions: IPermission[] = [];
  private groups: IGroup[] = [];

  constructor() {
    this.permissions = mockPermissions;
  }

  getPermissions() {
    return this.permissions;
  }

  getPaginatedPermissions(
    currentPage: number,
    resultsPerPage = 10
  ): IPermission[] {
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
