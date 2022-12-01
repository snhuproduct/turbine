import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { environment } from '../../../environments/environment';
import { AssessmentsController } from './assessments.controller';
import { AssessmentsService } from './assessments.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: environment.GPCoreBaseUrl + '/assessment-service/api/v1',
      timeout: 8000,
      maxRedirects: 3,
    }),
  ],
  controllers: [AssessmentsController],
  providers: [AssessmentsService],
})
export class AssessmentsModule { }
