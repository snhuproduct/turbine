import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private readonly httpService: HttpService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.user.data.idToken;

    this.httpService.axiosRef.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${token}`;

    return next.handle();
  }
}
