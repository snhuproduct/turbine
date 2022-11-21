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
  UseInterceptors
} from '@nestjs/common';
import { UserType } from '@toboggan-ws/toboggan-common';
import { omitBy , isUndefined } from 'lodash';
import { lastValueFrom } from 'rxjs';
import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { RequestInterceptor } from '../common/request.interceptor';
import { ResponseInterceptor } from '../common/response.interceptor';
import { CreateUserDTO, UpdateStatusDTO, UpdateUserDTO } from './users.dto';
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

  @Patch('/:id')
  patchUser(@Param('id') id, @Body() user: UpdateUserDTO) {
    return this.usersService.updateUser(id, {
      ...user,
      user_type: user.user_type || UserType.Learner,
    });
  }

  @Put('/:id')
  updateUser(@Param('id') id, @Body() user: UpdateUserDTO) {
    return this.usersService.updateUser(id, user);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id) {
    return this.usersService.deleteUser(id);
  }

  @Put('/status/:id')
  async updateStatus(@Param('id') id, @Body() body: UpdateStatusDTO) {
    const response = await lastValueFrom(this.getUser(id));

    const user = response.data.data;

    return this.usersService.updateUser(id, {
      ...user,
      status: body.status,
      user_groups: [],
    });
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
}
