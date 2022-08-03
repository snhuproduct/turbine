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
import { IUser } from '@toboggan-ws/toboggan-common';
import { UsersService } from '../../providers/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post('/')
  createUser(@Body() user: IUser) {
    return this.usersService.createUser(user);
  }

  @Put('/:id')
  updateUser(@Param('id') id, @Body() user: IUser) {
    return this.usersService.updateUser(id, user);
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
