import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { environment } from '../../../environments/environment';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: environment.GPCoreBaseUrl + '/user-management/api/v1',
      timeout: 8000,
      maxRedirects: 3,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
