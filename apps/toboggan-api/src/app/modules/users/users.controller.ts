import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import isUndefined from 'lodash/isUndefined';
import omitBy from 'lodash/omitBy';
import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { RequestInterceptor } from '../common/request.interceptor';
import { ResponseInterceptor } from '../common/response.interceptor';
import { CreateUserDTO, UpdateUserDTO } from './users.dto';
import { UsersService } from './users.service';

@UseGuards(HTTPHeaderAuthGuard)
@UseInterceptors(TokenInterceptor, ResponseInterceptor, RequestInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  getUsers(@Query() query) {
    const { skip, limit, user_type, email } = omitBy(query, isUndefined);

    if (email) {
      return this.usersService.searchUser(email);
    }

    return this.usersService.getUsers(skip, limit, user_type);
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Post('/')
  createUser(@Body() user: CreateUserDTO) {
    return this.usersService.createUser(user);
  }

  @Put('/:id')
  updateUser(@Param('id') id, @Body() user: UpdateUserDTO) {
    return this.usersService.updateUser(id, user);
  }

  // @Put('/:id/password')
  // resetPasswordOfUser(
  //   @Param('id') id,
  //   @Body()
  //   operationBody: {
  //     type: string;
  //   }
  // ) {
  //   switch (operationBody.type) {
  //     case 'reset':
  //       this.usersService.resetPasswordOfUser(id);
  //       break;
  //     default:
  //       throw new HttpException(
  //         { status: HttpStatus.BAD_REQUEST, error: `Invalid request-body!` },
  //         HttpStatus.BAD_REQUEST
  //       );
  //   }
  // }

  // @Patch('/:id')
  // patchUser(@Param('id') id, @Body() user: IUser) {
  //   return this.usersService.patchUser(id, user);
  // }

  // @Delete('/:id')
  // deleteUser(@Param('id') id) {
  //   return this.usersService.deleteUser(id);
  // }

  // @Patch('/:id/status')
  // changeStatusOfUser(@Param('id') id, @Body() body) {
  //   const { status } = body;

  //   return this.usersService.changeStatusOfUser(id, status);
  // }
}
