import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  IGroup,
  INewPermission,
  IPermission,
} from '@toboggan-ws/toboggan-common';
import * as arrayPaginate from 'array-paginate';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { mockPermissions } from './permissions.mock';

@Injectable()
export class PermissionService {
  private permissions: IPermission[] = [];
  private groups: IGroup[] = [];

  constructor(private readonly httpService: HttpService) {
    this.permissions = mockPermissions;
  }
  // dummy implementation  -> until Quantiphi api is verified
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // getPermissions(params?: { skip?: number; limit?: number }) {
  //   return this.permissions;
  // }

  getPermissions(
    skip: number,
    limit: number
  ): Observable<AxiosResponse<IPermission[]>> {
    const params = {
      skip: skip ?? 0,
      limit: limit ?? 1000,
    };
    return this.httpService.get('/permissions', { params });
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
