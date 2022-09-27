import { Test, TestingModule } from '@nestjs/testing';
import { mockPermissions } from '../../providers/permissions/permissions.mock';
import { PermissionService } from '../../providers/permissions/permissions.service';
import { PermissionsController } from './permissions.controller';

describe('PermissionsController', () => {
  let controller: PermissionsController;
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    it('should return an array of paginated permissions', async () => {
      jest
        .spyOn(service, 'getPaginatedPermissions')
        .mockImplementation(() => mockPermissions);

      expect(
        controller.getPermissions({
          currentPage: 1,
          resultsPerPage: 10,
        })
      ).toBe(mockPermissions);
    });

    it('should return an array of permissions', async () => {
      jest
        .spyOn(service, 'getPermissions')
        .mockImplementation(() => mockPermissions);

      expect(controller.getPermissions({})).toBe(mockPermissions);
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
