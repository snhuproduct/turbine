import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityMappingEntity } from './entities/activity.entity';
import { LearnosityAssessmentReportEntity } from './entities/learnosity-assessment-report.entity';
import { LearnosityEvaluatedReportEntity } from './entities/learnosity-evaluated-report.entity';
import { LocalDBService } from './localdb.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityMappingEntity,
      LearnosityAssessmentReportEntity,
      LearnosityEvaluatedReportEntity,
    ]),
  ],
  providers: [LocalDBService],
  controllers: [],
})
export class EntitiesModule {}
