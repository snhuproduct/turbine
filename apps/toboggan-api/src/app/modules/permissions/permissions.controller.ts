import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { INewPermission, IPermission } from '@toboggan-ws/toboggan-common';
import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { ResponseInterceptor } from '../common/response.interceptor';
import { PermissionService } from './permissions.service';

@UseGuards(HTTPHeaderAuthGuard)
@UseInterceptors(TokenInterceptor, ResponseInterceptor)
@Controller('permissions')
export class PermissionsController {
  constructor(private permissionService: PermissionService) {}

  @Get('/')
  getPermissions(@Query() query) {
    const { skip, limit } = query;

    return this.permissionService.getPermissions(skip, limit);
  }

  @Get('/:id')
  getPermission(@Param('id') id) {
    return this.permissionService.getPermission(id);
  }

  @Post('/')
  createPermission(@Body() permission: INewPermission) {
    return this.permissionService.createPermission(permission);
  }

  @Put('/:id')
  updatePermission(@Param('id') id, @Body() updatedPermission: IPermission) {
    return this.permissionService.updatePermission(id, updatedPermission);
  }

  @Delete('/:id')
  deletePermission(@Param('id') id) {
    return this.permissionService.deletePermission(id);
  }
}
