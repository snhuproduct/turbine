import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { v4 as uuidv4 } from 'uuid';
import { AssessmentsService } from '../../assessments/assessments.service';
import { LearnosityDataInitDTO } from './dto/learnosity.data-init.dto';
import { LearnosityAssessorFeedbacInitDTO } from './dto/learnosity.feedback-assessor.dto';
import { LearnosityPlayerController } from './learnosity-player.controller';
import { LearnosityPlayerService } from './learnosity-player.service';

const mockLearnosityPlayerService = {
  init: jest.fn(),
  getAssessmentItemBankDetails: jest.fn().mockReturnThis(),
  initAssesseeFeedback: jest.fn().mockReturnThis(),
  initAssessorFeedback: jest.fn().mockReturnThis(),
};

const mockAssessmentsService = {
  getAssessmentReferenceInfo: jest.fn(),
};

const response = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  send: (body?: any) => {},
  status: (code: number) => response,
};

describe('LearnosityPlayerController', () => {
  let controller: LearnosityPlayerController;
  let service: LearnosityPlayerService;
  const mockUserId = uuidv4();
  const mockRequest = {
    user: {
      data: {
        localId: mockUserId,
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [LearnosityPlayerController],
      providers: [
        {
          provide: LearnosityPlayerService,
          useValue: mockLearnosityPlayerService,
        },
        {
          provide: AssessmentsService,
          useValue: mockAssessmentsService,
        },
      ],
    }).compile();

    controller = module.get<LearnosityPlayerController>(
      LearnosityPlayerController
    );
    service = module.get<LearnosityPlayerService>(LearnosityPlayerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('initialize', () => {
    it('should initialize a learnosity request', () => {
      controller.initData(mockRequest, response, {} as LearnosityDataInitDTO);
      expect(service.init).toHaveBeenCalled();
    });
  });

  describe('getAssessments', () => {
    it('should get list of assessments', () => {
      controller.getAssessments();
      expect(service.getAssessmentItemBankDetails).toHaveBeenCalled();
    });
  });

  describe('initAssessment', () => {
    it('should initialize assessment request', () => {
      const spy = jest.spyOn(
        LearnosityPlayerController.prototype as any,
        'initialize'
      );
      controller.initAssessment(
        mockRequest,
        response,
        {} as LearnosityDataInitDTO
      );
      expect(spy).toHaveBeenCalled();
      expect(service.init).toHaveBeenCalled();
    });
  });

  // describe('initAssessmentGCP', () => {
  //   it('should generate learnosity request based on gcp ', () => {
  //     const payload = {
  //       assessment_id: 'quickstart_examples_activity_001',
  //       rendering_type: LearnosityRenderingType.Inline,
  //       type: LearnosityStudentResponseStorageType.SubmitPractice,
  //       name: 'demo test',
  //       state: LearnosityInitStates.Review,
  //       config: {},
  //     };
  //     controller.initAssessmentGCP(mockRequest, response, payload);
  //     expect(
  //       mockAssessmentsService.getAssessmentReferenceInfo
  //     ).toHaveBeenCalled();
  //   });
  // });

  describe('initQuestions', () => {
    it('should initialize assessment request', () => {
      const spy = jest.spyOn(
        LearnosityPlayerController.prototype as any,
        'initialize'
      );
      controller.initAssessment(
        mockRequest,
        response,
        {} as LearnosityDataInitDTO
      );
      expect(spy).toHaveBeenCalled();
      expect(service.init).toHaveBeenCalled();
    });
  });

  describe('initData', () => {
    it('should initialize learnosity request', () => {
      controller.initData(mockRequest, response, {} as LearnosityDataInitDTO);
      expect(service.init).toHaveBeenCalled();
    });
  });

  describe('initFeedback', () => {
    it('should initialize learnosity reports', () => {
      const userId = uuidv4();
      const sessionId = uuidv4();
      const activityId = 'quickstart_examples_activity_001';

      controller.initFeedback(userId, activityId, sessionId);
      expect(service.initAssesseeFeedback).toHaveBeenCalledTimes(1);
      expect(service.initAssesseeFeedback).toBeCalledWith(
        userId,
        activityId,
        sessionId
      );
    });
  });

  describe('initAssessorFeedback', () => {
    it('should initialize feedback reports request', () => {
      const request = {
        user_id: uuidv4(),
        rendering_type: 'inline',
        name: 'Items API demo - feedback activity.',
        state: 'review',
        activity_id: 'feedback_test_1',
        session_id: uuidv4(),
        items: [],
        type: 'feedback',
      };
      controller.initAssessorFeedback(
        request as LearnosityAssessorFeedbacInitDTO
      );
      expect(service.initAssessorFeedback).toHaveBeenCalledTimes(1);
      expect(service.initAssessorFeedback).toHaveBeenCalledWith(request);
    });
  });
});
