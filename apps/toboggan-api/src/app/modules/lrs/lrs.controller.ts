import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ActivityMappingEntity } from '../localdb/entities/activity.entity';
import { LearnosityAssessmentReportEntity } from '../localdb/entities/learnosity-assessment-report.entity';
import { LearnosityEvaluatedReportEntity } from '../localdb/entities/learnosity-evaluated-report.entity';
import { LocalDBService } from '../localdb/localdb.service';

@Controller('lrs')
export class LRSController {
  constructor(private localDB: LocalDBService) {}

  @Get('activities')
  async index(): Promise<ActivityMappingEntity[]> {
    return this.localDB.activityFindAll();
  }

  // get all activities by sessionId
  @Get('activities/:sessionId')
  async getBySessionId(
    @Param('sessionId') sessionId
  ): Promise<ActivityMappingEntity[]> {
    return this.localDB.activityFindBySessionId(sessionId);
  }

  @Get('activities/assessment/:assessmentId')
  async getByAssessmentId(
    @Param('assessmentId') assessmentId
  ): Promise<ActivityMappingEntity[]> {
    return this.localDB.activityFindByAssessmentId(assessmentId);
  }

  @Post('activities')
  async create(
    @Body() entitytData: ActivityMappingEntity
  ): Promise<ActivityMappingEntity> {
    return this.localDB.activityCreate(entitytData);
  }

  //////////// Learnosity reports - unmarked

  @Get('learnosity-reports')
  async getLearnosityReports(): Promise<LearnosityAssessmentReportEntity[]> {
    return this.localDB.learnosityReportsFindAll();
  }

  @Post('learnosity-reports/create')
  async learnosityReportCreate(
    @Body() entitytData: LearnosityAssessmentReportEntity[]
  ): Promise<LearnosityAssessmentReportEntity[]> {
    return this.localDB.learnosityReportCreate(entitytData);
  }

  @Patch('learnosity-reports/update')
  async learnosityReportUpdate(
    @Body() updatedEntityData: LearnosityAssessmentReportEntity
  ): Promise<UpdateResult> {
    return this.localDB.learnosityReportUpdate(updatedEntityData);
  }

  @Delete('learnosity-reports/delete/:learnosityReportSessionId')
  async learnosityReportDelete(
    @Param('learnosityReportSessionId') learnosityReportSessionId: string
  ): Promise<DeleteResult> {
    return this.localDB.learnosityReportDelete(learnosityReportSessionId);
  }

  @Delete('learnosity-reports/CLEAR-ALL')
  async learnosityReportDeleteAll(): Promise<void> {
    return this.localDB.learnosityReportDeleteAll();
  }

  //////////// Learnosity reports - marked

  @Get('learnosity-reports-evaluated')
  async getLearnosityEvaluatedReports(): Promise<
    LearnosityEvaluatedReportEntity[]
  > {
    return this.localDB.learnosityEvaluatedReportsFindAll();
  }

  @Post('learnosity-reports-evaluated/create')
  async learnosityEvaluatedReportCreate(
    @Body() entitytData: LearnosityEvaluatedReportEntity[]
  ): Promise<LearnosityEvaluatedReportEntity[]> {
    return this.localDB.learnosityEvaluatedReportCreate(entitytData);
  }

  @Patch('learnosity-reports-evaluated/update')
  async learnosityEvaluatedReportUpdate(
    @Body() updatedEntityData: LearnosityEvaluatedReportEntity
  ): Promise<UpdateResult> {
    return this.localDB.learnosityEvaluatedReportUpdate(updatedEntityData);
  }

  @Delete('learnosity-reports-evaluated/delete/:learnosityReportSessionId')
  async learnosityEvaluatedReportDelete(
    @Param('learnosityReportSessionId') learnosityReportSessionId: string
  ): Promise<DeleteResult> {
    return this.localDB.learnosityEvaluatedReportDelete(
      learnosityReportSessionId
    );
  }

  @Delete('learnosity-reports-evaluated/CLEAR-ALL')
  async learnosityEvaluatedReportDeleteAll(): Promise<void> {
    return this.localDB.learnosityEvaluatedReportDeleteAll();
  }
}
