import { Response, Request } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException, HttpStatus } from '@nestjs/common';
import errorResponse from 'src/helpers/error-response';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    errorResponse(response, {
      status: HttpStatus.NOT_FOUND,
      url: request.url,
      method: request.method,
      helper: {
        name: 'Not Found',
        message: 'Route not found',
        stack: '',
        context: {
          ip: request.ip as string,
          userAgent: request.headers['user-agent'] as string,
        },
      },
    });
  }
}
