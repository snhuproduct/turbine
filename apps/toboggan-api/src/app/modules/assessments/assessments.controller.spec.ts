import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentsController } from './assessments.controller';
import { AssessmentsService } from "./assessments.service";
import { v4 as uuidv4 } from 'uuid';
import { IAssessmentFlag } from './assessments.types';
import { HttpModule } from '@nestjs/axios';

describe('AssessmentsController', () => {
  let controller: AssessmentsController;
  let service: AssessmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentsController],
      providers: [AssessmentsService],
      imports:[HttpModule]
    }).compile();

    service = module.get<AssessmentsService>(AssessmentsService);
    controller = module.get<AssessmentsController>(AssessmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateFlagStatus', () => {
    it('should update flag status', async () => {
      
      const uuid = uuidv4();
      const body: IAssessmentFlag ={
          flag_status:true,
          comments:"mock updated"
      }
      jest.spyOn(service, 'updateFlagStatus');

      await controller.updateFlagStatus(uuid, body);

      expect(service.updateFlagStatus).toBeCalledWith(uuid, body);
    });
  });

});
