import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityMappingEntity } from './entities/activity.entity';
import { LearnosityAssessmentReportEntity } from './entities/learnosity-assessment-report.entity';
import { LearnosityEvaluatedReportEntity } from './entities/learnosity-evaluated-report.entity';
import { LocalDBService } from './localdb.service';

describe('LocalDBService', () => {
  let service: LocalDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<LocalDBService>(LocalDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
