import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { environment } from '../../../environments/environment';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: environment.GPCoreBaseUrl + '/user-management/api/v1',
      timeout: 8000,
      maxRedirects: 3,
    }),
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
