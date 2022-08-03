import { Module } from '@nestjs/common';
import { GroupsController } from '../controllers/groups/groups.controller';
import { UsersController } from '../controllers/users/users.controller';
import { GroupsService } from '../providers/groups/groups.service';
import { UsersService } from '../providers/users/users.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, GroupsController],
  providers: [AppService, UsersService, GroupsService],
})
export class AppModule {}
