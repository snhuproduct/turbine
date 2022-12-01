import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ActivityMappingEntity } from './entities/activity.entity';
import { LearnosityAssessmentReportEntity } from './entities/learnosity-assessment-report.entity';
import { LearnosityEvaluatedReportEntity } from './entities/learnosity-evaluated-report.entity';

@Injectable()
export class LocalDBService {
  constructor(
    @InjectRepository(ActivityMappingEntity)
    private entityRepository: Repository<ActivityMappingEntity>,
    @InjectRepository(LearnosityAssessmentReportEntity)
    private learnosityAssessmentReportRepository: Repository<LearnosityAssessmentReportEntity>,
    @InjectRepository(LearnosityEvaluatedReportEntity)
    private learnosityEvaluatedReportEntity: Repository<LearnosityEvaluatedReportEntity>
  ) {}

  // Activity Mapping functionality
  async activityFindAll(): Promise<ActivityMappingEntity[]> {
    return this.entityRepository.find();
  }

  async activityFindBySessionId(sessionId): Promise<ActivityMappingEntity[]> {
    return this.entityRepository.findBy({ sessionId: sessionId });
  }

  async activityFindByAssessmentId(
    assessmentId
  ): Promise<ActivityMappingEntity[]> {
    return this.entityRepository.findBy({ assessmentId: assessmentId });
  }

  async activityCreate(
    entity: ActivityMappingEntity
  ): Promise<ActivityMappingEntity> {
    return this.entityRepository.save(entity);
  }

  //////////// Learnosity reports - unmarked

  async learnosityReportsFindAll(): Promise<
    LearnosityAssessmentReportEntity[]
  > {
    return this.learnosityAssessmentReportRepository.find();
  }

  async learnosityReportCreate(
    learnosityReports: LearnosityAssessmentReportEntity[]
  ): Promise<LearnosityAssessmentReportEntity[]> {
    return this.learnosityAssessmentReportRepository.save(learnosityReports);
  }

  async learnosityReportUpdate(
    learnosityReport: LearnosityAssessmentReportEntity
  ): Promise<UpdateResult> {
    // We need to split LearnosityAssessmentReportEntity object into two parts: one with
    // the sessionId, which is the primary key, and the rest of the body: updateBody
    const updateBody = Object.keys(learnosityReport)
      .filter((key) => key !== 'id' && key !== 'sessionId')
      .reduce((prevObj, key) => {
        prevObj[key] = learnosityReport[key];
        return prevObj;
      }, {});
    return this.learnosityAssessmentReportRepository.update(
      { sessionId: learnosityReport.sessionId },
      updateBody
    );
  }

  async learnosityReportDelete(
    learnosityReportSessionId: string
  ): Promise<DeleteResult> {
    return this.learnosityAssessmentReportRepository.delete({
      sessionId: learnosityReportSessionId,
    });
  }

  async learnosityReportDeleteAll(): Promise<void> {
    return this.learnosityAssessmentReportRepository.clear();
  }

  //////////// Learnosity reports - marked

  async learnosityEvaluatedReportsFindAll(): Promise<
    LearnosityEvaluatedReportEntity[]
  > {
    return this.learnosityEvaluatedReportEntity.find();
  }

  async learnosityEvaluatedReportCreate(
    learnosityReport: LearnosityEvaluatedReportEntity[]
  ): Promise<LearnosityEvaluatedReportEntity[]> {
    return this.learnosityEvaluatedReportEntity.save(learnosityReport);
  }

  async learnosityEvaluatedReportUpdate(
    learnosityReport: LearnosityEvaluatedReportEntity
  ): Promise<UpdateResult> {
    const updateBody = Object.keys(learnosityReport)
      .filter((key) => key !== 'id' && key !== 'sessionId')
      .reduce((prevObj, key) => {
        prevObj[key] = learnosityReport[key];
        return prevObj;
      }, {});
    return this.learnosityEvaluatedReportEntity.update(
      { sessionId: learnosityReport.sessionId },
      updateBody
    );
  }

  async learnosityEvaluatedReportDelete(
    learnosityReportSessionId: string
  ): Promise<DeleteResult> {
    return this.learnosityEvaluatedReportEntity.delete({
      sessionId: learnosityReportSessionId,
    });
  }

  async learnosityEvaluatedReportDeleteAll(): Promise<void> {
    return this.learnosityEvaluatedReportEntity.clear();
  }

  // add additional functionality for other Entities here ...
}
