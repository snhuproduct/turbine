import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentsController } from './assessments.controller';
import { v4 as uuidv4 } from 'uuid';
import { IAssessmentFlag } from './assessments.types';
import { AssessmentsService } from './assessments.service';




describe('AssessmentsController', () => {
  let controller: AssessmentsController;
  let service: AssessmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentsController],
      providers:[AssessmentsService]
    }).compile();

    service = module.get<AssessmentsService>(AssessmentsService);
    controller = module.get<AssessmentsController>(AssessmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('updateFlagAssessment', () => {
    it('should update flag status', async () => {
      const uuid = uuidv4();
      const body: IAssessmentFlag ={
          flag_status:true,
          comments:"mock updated"
      }
      jest.spyOn(service, 'updateFlagAssessment');
      await controller.updateFlagAssessment(uuid,body);
      expect(service.updateFlagAssessment).toBeCalledWith(uuid,body);
    });
  });
});
