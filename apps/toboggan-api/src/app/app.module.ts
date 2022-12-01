import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentsModule } from './modules/assessments/assessments.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { GroupsModule } from './modules/groups/groups.module';
import { LearnosityModule } from './modules/learnosity/learnosity.module';
import { ActivityMappingEntity } from './modules/localdb/entities/activity.entity';
import { LearnosityAssessmentReportEntity } from './modules/localdb/entities/learnosity-assessment-report.entity';
import { LearnosityEvaluatedReportEntity } from './modules/localdb/entities/learnosity-evaluated-report.entity';
import { LRSModule } from './modules/lrs/lrs.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    GroupsModule,
    PermissionsModule,
    AssessmentsModule,
    AuthenticationModule,
    LearnosityModule,
    LRSModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'localdb.sqlite',
      entities: [
        ActivityMappingEntity,
        LearnosityAssessmentReportEntity,
        LearnosityEvaluatedReportEntity,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
