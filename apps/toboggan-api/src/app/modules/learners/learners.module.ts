import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LearnersController } from './learners.controller';
import { LearnersService } from './learners.service';
import { environment } from '../../../environments/environment';

@Module({
  imports: [
    HttpModule.register({
      baseURL: environment.GPCoreBaseUrl + '/learner-profile-service/api/v1',
      timeout: 8000,
      maxRedirects: 3,
    }),
  ],
  controllers: [LearnersController],
  providers: [LearnersService],
})
export class LearnersModule {}
