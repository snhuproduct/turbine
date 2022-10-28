import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { GroupsModule } from './modules/groups/groups.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, GroupsModule, PermissionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
