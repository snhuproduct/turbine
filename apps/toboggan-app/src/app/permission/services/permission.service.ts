import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INewPermission, IPermission } from '@toboggan-ws/toboggan-common';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private http: HttpClient) { }
  mockPermission:any = {};
  addPermission(permission: INewPermission) {
    return this.http.post('/api/permissions', permission);
  }

  // Fetch all permissions
  fetchPermissions() {
    return this.http.get<IPermission[]>('/api/permissions');
  }

  fetchPermissionDetails(id: string) {
    return this.http.get<IPermission>('/api/permissions/:' + id);
  }

  // Creates permission
  createPermission(permission: INewPermission) {
    return this.http.post('/api/permissions', permission);
  }

  // Updates permission
  updatePermission(permission: IPermission) {
    return this.http.put('/api/permissions/:' + permission.id, permission);
  }

  //Delete permission
  deletePermission(permissionId: string) {
    return this.http.delete(`/api/permissions/:${permissionId}`);
  }

  //mock update Permission
  patchPermission(data:any){
    //mockapi
    return this.http.get<IPermission[]>('/api/permissions');
  }
}
