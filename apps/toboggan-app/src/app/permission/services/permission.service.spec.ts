import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { INewPermission, IPermission } from '@toboggan-ws/toboggan-common';

import { mockPermissions } from '../components/permissions-list/permission-test.mock';
import { PermissionService } from './permission.service';

describe('PermissionService', () => {
  let service: PermissionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PermissionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should verify getPermissions', () => {
    service.fetchPermissions().subscribe();
    const req = httpMock.expectOne(`/api/permissions`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPermissions);
  });

  it('should verify fetchPermissionDetails', () => {
    const permissionId = mockPermissions[0]?.id;
    service.fetchPermissionDetails(permissionId).subscribe();
    const req = httpMock.expectOne(`/api/permissions/:${permissionId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPermissions[0]);
  });

  it('should verify createPermission', () => {
    const newPermission: INewPermission = mockPermissions[0];
    service.createPermission(newPermission).subscribe();
    const req = httpMock.expectOne(`/api/permissions`);
    expect(req.request.method).toBe('POST');
    req.flush(newPermission);
  });

  it('should verify updatePermission', () => {
    const updatedPermission: IPermission = mockPermissions[0];
    service.updatePermission(updatedPermission).subscribe();
    const req = httpMock.expectOne(
      `/api/permissions/:${updatedPermission?.id}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPermission);
  });

  it('should verify deletePermission', () => {
    const permissionId = mockPermissions[0]?.id;
    service.deletePermission(permissionId).subscribe();
    const req = httpMock.expectOne(`/api/permissions/:${permissionId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(permissionId);
  });
});
