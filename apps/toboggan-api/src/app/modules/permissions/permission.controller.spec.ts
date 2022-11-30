import { Test, TestingModule } from '@nestjs/testing';

import { HttpModule } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PermissionsController } from './permissions.controller';
import { mockPermissions } from './permissions.mock';
import { PermissionService } from './permissions.service';

const mockResponse: AxiosResponse = {
  data: null,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
describe('PermissionsController', () => {
  let controller: PermissionsController;
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: environment.GPCoreBaseUrl + '/user-management/api/v1',
          timeout: 8000,
          maxRedirects: 3,
        }),
      ],
      controllers: [PermissionsController],
      providers: [PermissionService],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
    controller = module.get<PermissionsController>(PermissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPermissions', () => {
    it('should return an array of paginated learners', async () => {
      mockResponse.data = mockPermissions;
      jest
        .spyOn(service, 'getPermissions')
        .mockImplementation(() => of(mockResponse));

      controller
        .getPermissions({
          skip: 1,
          limit: 10,
        })
        .subscribe((response) => {
          expect(service.getPermissions).toHaveBeenCalledWith(1, 10);
          expect(response).toBe(mockResponse);
        });
    });
  });

  describe('getPermission', () => {
    it('should return a permission', async () => {
      const permission = mockPermissions[0];

      jest.spyOn(service, 'getPermission').mockImplementation(() => permission);

      expect(await controller.getPermission(permission?.id)).toBe(permission);
    });
  });

  describe('createPermission', () => {
    it('should create permission', async () => {
      const newPermission = mockPermissions[0];
      jest.spyOn(service, 'createPermission');

      await controller.createPermission(newPermission);

      expect(service.createPermission).toBeCalledWith(newPermission);
    });
  });

  describe('updatePermission', () => {
    it('should update permission', async () => {
      const updatedPermission = mockPermissions[0];
      jest.spyOn(service, 'updatePermission');

      await controller.updatePermission(
        updatedPermission?.id,
        updatedPermission
      );

      expect(service.updatePermission).toBeCalledWith(
        updatedPermission?.id,
        updatedPermission
      );
    });
  });

  describe('deletePermission', () => {
    it('should delete permission', async () => {
      const permissionId = mockPermissions[0]?.id;
      jest.spyOn(service, 'deletePermission');

      await controller.deletePermission(permissionId);

      expect(service.deletePermission).toBeCalledWith(permissionId);
    });
  });
});
