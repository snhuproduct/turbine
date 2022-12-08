import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
const id = 1;

const group: IGroup = {
  name: 'Group name',
  description: 'Desc',
  uuid: 'uuid',
  members: [],
  permissions: [],
};

const groups: IGroup[] = [];

for (let i = 0; i < 20; i++) {
  groups.push({
    name: `Group name ${i}`,
    description: 'Desc',
    uuid: `uuid-${i}`,
    members: [],
    permissions: [],
  });
}
const mockResponse: AxiosResponse = {
  data: null,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};
describe('GroupsController', () => {
  let controller: GroupsController;
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: environment.GPCoreBaseUrl + '/user-management/api/v1',
          timeout: 8000,
          maxRedirects: 3,
        }),
      ],
      controllers: [GroupsController],
      providers: [GroupsService],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
    controller = module.get<GroupsController>(GroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getGroups', () => {
    it('should return an array of paginated learners', async () => {
      mockResponse.data = groups;
      jest
        .spyOn(service, 'getGroups')
        .mockImplementation(() => of(mockResponse));

      controller
        .getGroups({
          skip: 1,
          limit: 10,
        })
        .subscribe((response) => {
          expect(service.getGroups).toHaveBeenCalledWith(1, 10);
          expect(response).toBe(mockResponse);
        });
    });
  });

  describe('getGroup', () => {
    it('should return a group', async () => {
      jest.spyOn(service, 'getGroup').mockImplementation(() => group as any);

      expect(await controller.getGroup(group.uuid)).toBe(group);
    });
  });

  describe('createGroup', () => {
    it('should create group', async () => {
      jest.spyOn(service, 'createGroup');

      await controller.createGroup(group);

      expect(service.createGroup).toBeCalledWith(group);
    });
  });

  describe('updateGroup', () => {
    it('should update group', async () => {
      jest.spyOn(service, 'updateGroup');

      await controller.updateGroup(id, group);

      expect(service.updateGroup).toBeCalledWith(id, group);
    });
  });

  describe('patchGroup', () => {
    it('should patch group', async () => {
      jest.spyOn(service, 'patchGroup');

      await controller.patchGroup(id, group);

      expect(service.patchGroup).toBeCalledWith(id, group);
    });
  });

  describe('deleteGroup', () => {
    it('should delete group', async () => {
      jest.spyOn(service, 'deleteGroup');

      await controller.deleteGroup(id);

      expect(service.deleteGroup).toBeCalledWith(id);
    });
  });
});
