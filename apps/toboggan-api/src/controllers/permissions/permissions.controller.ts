import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IPermission } from '@toboggan-ws/toboggan-common';
import { PermissionService } from '../../providers/permissions/permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private permissionService: PermissionService) {}

  @Get('/')
  getPermissions(@Query() query) {
    const { currentPage, resultsPerPage } = query;

    if (currentPage && resultsPerPage) {
      return this.permissionService.getPaginatedPermissions(
        currentPage,
        resultsPerPage
      );
    }

    return this.permissionService.getPermissions();
  }

  @Get('/:id')
  getPermission(@Param('id') id) {
    return this.permissionService.getPermission(id);
  }

  @Post('/')
  createPermission(@Body() permission: IPermission) {
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
