import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityMappingEntity } from '../localdb/entities/activity.entity';
import { LearnosityAssessmentReportEntity } from '../localdb/entities/learnosity-assessment-report.entity';
import { LearnosityEvaluatedReportEntity } from '../localdb/entities/learnosity-evaluated-report.entity';
import { LocalDBService } from '../localdb/localdb.service';
import { LRSController } from './lrs.controller';

describe('LRS Controller', () => {
  let controller: LRSController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LRSController],
      providers: [
        LocalDBService,
        {
          provide: getRepositoryToken(ActivityMappingEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(LearnosityAssessmentReportEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(LearnosityEvaluatedReportEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<LRSController>(LRSController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
