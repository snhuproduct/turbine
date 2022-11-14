import {
  Body,
  Controller, HttpException, HttpStatus, Post, UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { HTTPHeaderAuthGuard } from '../auth/http-header-auth-guard.service';
import { TokenInterceptor } from '../auth/token.interceptor';
import { RequestInterceptor } from '../common/request.interceptor';
import { ResponseInterceptor } from '../common/response.interceptor';
import { AuthenticationService } from './authentication.service';
  
  @UseGuards(HTTPHeaderAuthGuard)
  @UseInterceptors(TokenInterceptor, ResponseInterceptor, RequestInterceptor)
  @Controller('authentication')
  export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) { }


  @Post('/passwordresetemail')
  sendPasswordResetEmail(@Body() body: {email: string}) {
    console.log(body)
    if(!body || !body?.email) {
       throw new HttpException("Invalid email", HttpStatus.BAD_REQUEST)
    }
    return this.authService.sendPasswordResetEmail(body.email);
  }

  }
  