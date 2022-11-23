import { Test, TestingModule } from '@nestjs/testing';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { v4 as uuidv4 } from 'uuid';
import { AxiosResponse } from 'axios';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { HttpModule } from '@nestjs/axios';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
const id = 1;

const group: IGroup = {
  id: uuidv4(),
  name: 'Group name',
  description: 'Desc',
};

const groups: IGroup[] = [];

for (let i = 0; i < 20; i++) {
  groups.push({
    id: uuidv4(),
    name: `Group name ${i}`,
    description: 'Desc',
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
          currentPage: 1,
          resultsPerPage: 10,
        })
        .subscribe((response) => {
          expect(service.getGroups).toHaveBeenCalledWith({
            limit: 10,
            skip: 1,
          });
          expect(response).toBe(mockResponse);
        });
    });
  });

  describe('getGroup', () => {
    it('should return a group', async () => {
      jest.spyOn(service, 'getGroup').mockImplementation(() => group);

      expect(await controller.getGroup()).toBe(group);
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

  describe('addUsersToGroup', () => {
    it('should add users to group', async () => {
      const request = {
        groupId: '1',
        email: 'email@test.com',
      };

      jest.spyOn(service, 'addUsersToGroup');

      await controller.addUsersToGroup(request);

      expect(service.addUsersToGroup).toBeCalledWith(request);
    });
  });
});
