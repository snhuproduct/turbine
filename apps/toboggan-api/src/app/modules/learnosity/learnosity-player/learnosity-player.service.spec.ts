import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ILearnosityActivityRequestPayload,
  ILearnosityFeedbackRequestPayload,
  LearnosityInitStates,
  LearnosityRenderingType,
  LearnosityStudentResponseStorageType,
  LearnositySubmissionTypes,
} from '@poc-learning/poc-learning-common';
import { v4 as uuidv4 } from 'uuid';
import { AssessmentsService } from '../../assessments/assessments.service';
import { itemBankTempMap } from '../learnosity.config';
import { LearnosityPlayerService } from './learnosity-player.service';

describe('LearnosityPlayerService', () => {
  let service: LearnosityPlayerService;
  let learnosityInitSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [LearnosityPlayerService, AssessmentsService],
    }).compile();

    service = module.get<LearnosityPlayerService>(LearnosityPlayerService);
    learnosityInitSpy = jest.spyOn((service as any).learnositySdk, 'init');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('init', () => {
    it('should initialize learnosity request object', () => {
      const mockRequest = {
        activity_template_id: 'quickstart_examples_activity_template_001',
        session_id: uuidv4(),
        activity_id: 'quickstart_examples_activity_001',
        rendering_type: LearnosityRenderingType.Inline,
        type: LearnosityStudentResponseStorageType.SubmitPractice,
        name: 'Demo ',
        state: LearnosityInitStates.Initial,
      };
      service.init(mockRequest as ILearnosityActivityRequestPayload);
      expect(learnosityInitSpy).toHaveBeenCalled();
    });
  });

  describe('getAssessmentItemBankDetails', () => {
    it('should get item bank contents', () => {
      const assessments = service.getAssessmentItemBankDetails();
      expect(assessments.length).toBe(Object.keys(itemBankTempMap).length);
    });
  });

  describe('initAssesseeFeedback', () => {
    it('should initialize reports api request', () => {
      const userId = uuidv4();
      const sessionId = uuidv4();
      const activityId = 'quickstart_examples_activity_001';

      const reportsReq = service.initAssesseeFeedback(
        userId,
        activityId,
        sessionId
      );
      expect(learnosityInitSpy).toHaveBeenCalled();
      expect(reportsReq.request).toBeDefined();
    });
  });

  describe('initAssessorFeedback', () => {
    it('should call items api for initializing feedback items', () => {
      const payLoad = {
        user_id: uuidv4(),
        session_id: uuidv4(),
        activity_id: 'quickstart_examples_activity_001',
        rendering_type: LearnosityRenderingType.Inline,
        type: LearnositySubmissionTypes.feedback,
        name: 'Demo test',
        items: [
          {
            id: '1',
            reference: 'test',
          },
        ],
        state: LearnosityInitStates.Review,
      };
      service.initAssessorFeedback(
        payLoad as ILearnosityFeedbackRequestPayload
      );
      expect(learnosityInitSpy).toHaveBeenCalled();
    });
  });
});
