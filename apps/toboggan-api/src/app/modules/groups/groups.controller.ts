import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IAddUserToGroup, IGroup } from '@toboggan-ws/toboggan-common';
import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { ResponseInterceptor } from '../common/response.interceptor';
import { GroupsService } from './groups.service';

@UseGuards(HTTPHeaderAuthGuard)
@UseInterceptors(TokenInterceptor, ResponseInterceptor)
@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get('/')
  getGroups(@Query() query) {
    const { currentPage: skip, resultsPerPage: limit } = query;

    return this.groupsService.getGroups({ skip, limit });
  }

  @Get('/:id')
  getGroup() {
    return this.groupsService.getGroup();
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
  @Post('/addusertogroup')
  addUsersToGroup(@Body() request: IAddUserToGroup) {
    return this.groupsService.addUsersToGroup(request);
  }

  //Remove user from a group
  @Delete('/:id/user/:userid')
  removeUserFromGroup(@Param('id') groupId, @Param('userId') userId) {
    console.log(groupId, userId);
  }
}
