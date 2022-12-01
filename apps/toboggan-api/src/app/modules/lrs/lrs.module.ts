import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityMappingEntity } from '../localdb/entities/activity.entity';
import { LearnosityAssessmentReportEntity } from '../localdb/entities/learnosity-assessment-report.entity';
import { LearnosityEvaluatedReportEntity } from '../localdb/entities/learnosity-evaluated-report.entity';
import { LocalDBService } from '../localdb/localdb.service';
import { LRSController } from './lrs.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityMappingEntity,
      LearnosityAssessmentReportEntity,
      LearnosityEvaluatedReportEntity,
    ]),
  ],
  providers: [LocalDBService],
  controllers: [LRSController],
})
export class LRSModule {}
