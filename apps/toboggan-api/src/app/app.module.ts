import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users/users.controller';
import { UsersService } from '../providers/users/users.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
