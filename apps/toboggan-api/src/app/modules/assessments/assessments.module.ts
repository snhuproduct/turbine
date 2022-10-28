import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { environment } from '../../../environments/environment';
import { AssessmentsService } from './assessments.service';
import { AssessmentsController } from './assessments.controller';

@Module({
  imports: [
    HttpModule.register({
      baseURL: environment.GPCoreBaseUrl + '/assessment-service/api/v1',
      timeout: 8000,
      maxRedirects: 3,
    }),
  ],
  providers: [AssessmentsService],
  controllers: [AssessmentsController],
})
export class AssessmentsModule {}
