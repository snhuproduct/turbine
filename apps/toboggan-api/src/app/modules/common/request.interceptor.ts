import { HttpEvent, HttpHandler } from '@angular/common/http';
import {
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { modelToSnakeCase } from './utils';
@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = context.switchToHttp().getRequest();
    if (request.body) {
      request.body = modelToSnakeCase(request.body);
    }
    return next.handle(request);
  }
}

