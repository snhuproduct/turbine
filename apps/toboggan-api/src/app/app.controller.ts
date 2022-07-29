import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { IGroup } from '@toboggan-ws/toboggan-common';

import { AppService, IAddUsertoGroup } from './app.service';

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
  createGroup(@Body() request: IGroup) {
    return this.appService.createGroup(request);
  }

  @Put('groups/:id')
  updateGroup(@Param('id') id) {
    return this.appService.updateGroup(id);
  }

  @Post('addusertogroup')
  addUserstoGroup(@Body() request: IAddUsertoGroup) {
    return this.appService.addUserstoGroup(request);
  }
}