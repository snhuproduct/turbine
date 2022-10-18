import { Module } from '@nestjs/common';
import { GroupsController } from '../controllers/groups/groups.controller';
import { PermissionsController } from '../controllers/permissions/permissions.controller';
import { UsersController } from '../controllers/users/users.controller';
import { GroupsService } from '../providers/groups/groups.service';
import { PermissionService } from '../providers/permissions/permissions.service';
import { UsersService } from '../providers/users/users.service';
import { AuthModule } from './modules/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule],
  controllers: [
    AppController,
    UsersController,
    GroupsController,
    PermissionsController,
  ],
  providers: [AppService, UsersService, GroupsService, PermissionService],
})
export class AppModule {}
