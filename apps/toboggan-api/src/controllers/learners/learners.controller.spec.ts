import { Test, TestingModule } from '@nestjs/testing';
import { LearnersController } from './learners.controller';

describe('GroupsController', () => {
  let controller: LearnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LearnersController],
    }).compile();

    controller = module.get<LearnersController>(LearnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
