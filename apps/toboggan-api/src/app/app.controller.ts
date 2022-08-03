import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { IAddUsertoGroup, IGroup } from '@toboggan-ws/toboggan-common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('groups')
  getGroups() {
    return this.appService.getGroups();
  }

  @Post('groups')
  createGroup(@Body() group: IGroup) {
    return this.appService.createGroup(group);
  }

  @Put('groups/:id')
  updateGroup(@Param('id') id, @Body() updatedGroup: IGroup) {
    return this.appService.updateGroup(id, updatedGroup);
  }

  @Patch('groups/:id')
  patchGroup(@Param('id') id, @Body() updatedGroup: IGroup) {
    return this.appService.patchGroup(id, updatedGroup);
  }

  @Delete('groups/:id')
  deleteGroup(@Param('id') id) {
    return this.appService.deleteGroup(id);
  }

  @Post('addusertogroup')
  addUserstoGroup(@Body() request: IAddUsertoGroup) {
    return this.appService.addUserstoGroup(request);
  }
}
