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
import {
  CreateGroupDto,
  IAddUserToGroupDto,
  PatchGroupDto,
} from './groups.dto';

import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { RequestInterceptor } from '../common/request.interceptor';
import { ResponseInterceptor } from '../common/response.interceptor';
import { GroupsService } from './groups.service';

@UseGuards(HTTPHeaderAuthGuard)
@UseInterceptors(TokenInterceptor, ResponseInterceptor, RequestInterceptor)
@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get('/')
  getGroups(@Query() query) {
    const { skip, limit } = query;
    return this.groupsService.getGroups(skip, limit);
  }

  @Get('/:uuid')
  getGroup(@Param('uuid') uuid) {
    return this.groupsService.getGroup(uuid);
  }

  @Post('/')
  createGroup(@Body() group: CreateGroupDto) {
    return this.groupsService.createGroup(group);
  }

  @Put('/:uuid')
  updateGroup(
    @Param('uuid') uuid,
    @Body() updatedGroup: Partial<CreateGroupDto>
  ) {
    return this.groupsService.updateGroup(uuid, updatedGroup);
  }

  @Patch('/:id')
  patchGroup(@Param('id') id, @Body() updatedGroup: PatchGroupDto) {
    return this.groupsService.patchGroup(id, updatedGroup);
  }

  @Delete('/:id')
  deleteGroup(@Param('id') id) {
    return this.groupsService.deleteGroup(id);
  }

  // TODO: Refactor this route to follow REST principles
  @Post('/addusertogroup')
  addUsersToGroup(@Body() request: IAddUserToGroupDto) {
    return this.groupsService.addUsersToGroup(request);
  }
}
