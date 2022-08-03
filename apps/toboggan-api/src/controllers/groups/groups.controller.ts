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
import { GroupsService } from '../../providers/groups/groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get('/')
  getGroups() {
    return this.groupsService.getGroups();
  }

  @Post('/')
  createGroup(@Body() group: IGroup) {
    return this.groupsService.createGroup(group);
  }

  @Put('/:id')
  updateGroup(@Param('id') id, @Body() updatedGroup: IGroup) {
    return this.groupsService.updateGroup(id, updatedGroup);
  }

  @Patch('/:id')
  patchGroup(@Param('id') id, @Body() updatedGroup: IGroup) {
    return this.groupsService.patchGroup(id, updatedGroup);
  }

  @Delete('/:id')
  deleteGroup(@Param('id') id) {
    return this.groupsService.deleteGroup(id);
  }

  // TODO: Refactor this route to follow REST principles
  @Post('addusertogroup')
  addUserstoGroup(@Body() request: IAddUsertoGroup) {
    return this.groupsService.addUsersToGroup(request);
  }
}
