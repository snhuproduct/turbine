/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { IUser } from '@toboggan-ws/toboggan-common';
import { environment } from '../../../environments/environment';
import { UsersController } from './users.controller';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';

const id = 1;

const user: IUser = {
  userId: `id-1`,
  userName: `user1`,
  firstName: `name1`,
  lastName: `last1`,
  email: `user-1@sada.com`,
  enabled: true,
};

const users: IUser[] = [];

for (let i = 0; i < 20; i++) {
  users.push({
    userId: `id-${i}`,
    userName: `user${i}`,
    firstName: `name${i}`,
    lastName: `last${i}`,
    email: `user-${i}@sada.com`,
    enabled: true,
  });
}

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
      imports: [
        HttpModule.register({
          baseURL: environment.GPCoreBaseUrl + '/user-management/api/v1',
          timeout: 8000,
          maxRedirects: 3,
        }),
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      //@ts-ignore
      jest.spyOn(service, 'getUsers').mockImplementation(() => users);

      expect(await controller.getUsers({})).toBe(users);
    });
  });

  describe('createUser', () => {
    it('should create user', async () => {
      jest.spyOn(service, 'createUser');

      await controller.createUser(user as CreateUserDto);

      expect(service.createUser).toBeCalledWith(user);
    });
  });

  describe('updateUser', () => {
    it('should update user', async () => {
      jest.spyOn(service, 'updateUser');

      await controller.updateUser(id, user as CreateUserDto);

      expect(service.updateUser).toBeCalledWith(id, user);
    });
  });

  describe('resetPasswordOfUser', () => {
    it('should reset password of user', async () => {
      const operationBody = {
        type: 'reset',
      };

      jest.spyOn(service, 'resetPasswordOfUser');

      await controller.resetPasswordOfUser(id, operationBody);

      expect(service.resetPasswordOfUser).toBeCalledWith(id);
    });

    it('should throw http exception', async () => {
      const operationBody = {
        type: 'something else',
      };

      expect(() => controller.resetPasswordOfUser(id, operationBody)).toThrow(
        'Http Exception'
      );
    });
  });

  describe('patchUser', () => {
    it('should patch user', async () => {
      jest.spyOn(service, 'patchUser');

      await controller.patchUser(id, user);

      expect(service.patchUser).toBeCalledWith(id, user);
    });
  });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      jest.spyOn(service, 'deleteUser');

      await controller.deleteUser(id);

      expect(service.deleteUser).toBeCalledWith(id);
    });
  });
});
