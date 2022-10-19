import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IUser } from '@toboggan-ws/toboggan-common';
import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { ResponseInterceptor } from '../common/response.interceptor';
import { UsersService } from './users.service';

@UseGuards(HTTPHeaderAuthGuard)
@UseInterceptors(TokenInterceptor, ResponseInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  getUsers(@Query() query) {
    const { currentPage: skip, resultsPerPage: limit } = query;

    return this.usersService.getUsers({ skip, limit });
  }

  @Post('/')
  createUser(@Body() user: IUser) {
    return this.usersService.createUser(user);
  }

  @Put('/:id')
  updateUser(@Param('id') id, @Body() user: IUser) {
    return this.usersService.updateUser(id, user);
  }

  @Put('/:id/password')
  resetPasswordOfUser(
    @Param('id') id,
    @Body()
    operationBody: {
      type: string;
    }
  ) {
    switch (operationBody.type) {
      case 'reset':
        this.usersService.resetPasswordOfUser(id);
        break;
      default:
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, error: `Invalid request-body!` },
          HttpStatus.BAD_REQUEST
        );
    }
  }

  @Patch('/:id')
  patchUser(@Param('id') id, @Body() user: IUser) {
    return this.usersService.patchUser(id, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id) {
    return this.usersService.deleteUser(id);
  }
}
