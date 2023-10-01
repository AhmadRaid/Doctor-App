// api-response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorResponse } from 'src/common/dtos/error-response.dto';
import { SuccessResponse } from 'src/common/dtos/success-response.dto';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        // You can modify the response data here if needed.
        return new SuccessResponse(statusCode, 'Success Process', data);
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();

        const statusCode = response.statusCode;
        if (error instanceof HttpException) {
          throw error;
        }

        return of(
          new ErrorResponse(
            'Fail Process',
            error.message || 'Internal Server Error',
            statusCode,
          ),
        );
      }),
    );
  }
}
