import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, throwError } from 'rxjs';
import { modelToCamelCase } from './utils';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((err) =>
        throwError(
          () =>
            new HttpException(err.response?.data?.message, err.response?.status)
        )
      ),
      map((response) => {
        const payload = response?.data;
        if (payload?.success === 'false') {
          throwError(() => new Error(payload.message));
        }

        if (payload?.data) {
          payload.data = modelToCamelCase(payload.data);
        }

        return payload?.data;
      })
    );
  }
}
