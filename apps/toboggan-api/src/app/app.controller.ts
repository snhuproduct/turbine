import { Controller, Get, Post, Put, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Post('users')
  createUser() {
    return this.appService.createUser();
  }

  @Put('users/:id')
  updateUser(@Param('id') id) {
    return this.appService.updateUser(id);
  }

  @Put('users/:id/enable')
  enableUser(@Param('id') id) {
    return this.appService.enableUser(id);
  }

  @Put('users/:id/disable')
  disableUser(@Param('id') id) {
    return this.appService.disableUser(id);
  }



  @Get('groups')
  getGroups() {
    return this.appService.getGroups();
  }

  @Post('groups')
  createGroup() {
    return this.appService.createGroup();
  }

  @Put('groups/:id')
  updateGroup(@Param('id') id) {
    return this.appService.updateGroup(id);
  }
}