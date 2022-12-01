import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AssessmentsService } from '../assessments/assessments.service';
import { LearnosityPlayerController } from './learnosity-player/learnosity-player.controller';
import { LearnosityPlayerService } from './learnosity-player/learnosity-player.service';

import { environment } from '../../../environments/environment';

@Module({
  imports: [
    HttpModule.register({
      baseURL: environment.GPCoreBaseUrl + '/assessment-service/api/v1',
      timeout: 8000,
      maxRedirects: 3,
    }),
  ],
  controllers: [LearnosityPlayerController],
  providers: [LearnosityPlayerService, AssessmentsService],
})
export class LearnosityModule {}
