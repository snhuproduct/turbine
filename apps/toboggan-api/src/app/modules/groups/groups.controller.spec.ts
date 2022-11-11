import { Test, TestingModule } from '@nestjs/testing';
import { IGroup } from '@toboggan-ws/toboggan-common';
import { v4 as uuidv4 } from 'uuid';
import { GroupsService } from '../../../providers/groups/groups.service';
import { GroupsController } from './groups.controller';

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

describe('GroupsController', () => {
  let controller: GroupsController;
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    it('should return an array of paginated groups', async () => {
      jest
        .spyOn(service, 'getPaginatedGroups')
        .mockImplementation(() => groups);

      expect(
        controller.getGroups({
          currentPage: 1,
          resultsPerPage: 10,
        })
      ).toBe(groups);
    });

    it('should return an array of groups', async () => {
      jest.spyOn(service, 'getGroups').mockImplementation(() => groups);

      expect(controller.getGroups({})).toBe(groups);
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
