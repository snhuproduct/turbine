import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { environment } from '../../../environments/environment';
import { PermissionsController } from './permissions.controller';
import { PermissionService } from './permissions.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: environment.GPCoreBaseUrl + '/user-management/api/v1',
      timeout: 8000,
      maxRedirects: 3,
    }),
  ],
  controllers: [PermissionsController],
  providers: [PermissionService],
})
export class PermissionsModule {}
