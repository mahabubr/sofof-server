import { Response, Request } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  PayloadTooLargeException,
  RequestTimeoutException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/client';
import errorResponse from 'src/helpers/error-response';

@Catch()
class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const isDev = process.env.mode === 'development';
    const defaultStack = 'No Stack Found';

    let name = 'Error';
    let message = 'Something went wrong';
    let stack = defaultStack;

    if (exception instanceof BadRequestException && Array.isArray((exception.getResponse() as any)?.message)) {
      const validationErrors = (exception.getResponse() as any).message;
      name = 'Validation Error';
      message = validationErrors.join(', ');
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof UnauthorizedException) {
      name = 'Unauthorized';
      message = 'Unauthorized access';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof ForbiddenException) {
      name = 'Forbidden';
      message = 'Access denied';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof NotFoundException) {
      name = 'Not Found';
      message = 'Resource not found';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof ConflictException) {
      name = 'Conflict';
      message = 'Conflict detected';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof PayloadTooLargeException) {
      name = 'Payload Too Large';
      message = 'Payload too large';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof RequestTimeoutException) {
      name = 'Request Timeout';
      message = 'Request timed out';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof ServiceUnavailableException) {
      name = 'Service Unavailable';
      message = 'Service temporarily unavailable';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof SyntaxError) {
      name = 'Syntax Error';
      message = isDev ? exception.message : 'Invalid request syntax';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof TypeError) {
      name = 'Type Error';
      message = isDev ? exception.message : 'Type mismatch occurred';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof ReferenceError) {
      name = 'Reference Error';
      message = isDev ? exception.message : 'Invalid reference';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      name = isDev ? exception.name : 'Error';
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any)?.message || 'HTTP Exception';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof Error) {
      name = isDev ? exception.name : 'Error';
      message = isDev ? exception.message : 'Internal Server Error';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof PrismaClientKnownRequestError) {
      name = 'Prisma Known Error';

      if (exception.code === 'P2002') {
        const target = Array.isArray(exception.meta?.target) ? (exception.meta?.target as string[]) : [];
        message = `Unique constraint failed on the field(s): ${target.join(', ')}`;
      } else if (exception.code === 'P2003') {
        message = 'Foreign key constraint failed. The related record does not exist.';
      } else if (exception.code === 'P2004') {
        message = 'A constraint failed on the database.';
      } else if (exception.code === 'P2010') {
        message = 'Raw query failed. Check your database logs.';
      } else if (exception.code === 'P2011') {
        message = 'Null constraint violation on a required field.';
      } else if (exception.code === 'P2012') {
        message = 'Missing required value for a field.';
      } else if (exception.code === 'P2013') {
        message = 'Missing required argument in query.';
      } else if (exception.code === 'P2014') {
        message = 'Detected a cycle in a relation or multiple paths to the same record.';
      } else if (exception.code === 'P2025') {
        message = 'Record not found for the given query.';
      } else {
        message = `A known Prisma error occurred. Code: ${exception.code}`;
      }

      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof PrismaClientUnknownRequestError) {
      name = 'Prisma Unknown Error';
      message = 'An unknown Prisma error occurred';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof PrismaClientRustPanicError) {
      name = 'Prisma Panic';
      message = 'A critical error occurred in Prisma';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof PrismaClientInitializationError) {
      name = 'Prisma Init Error';
      message = 'Prisma failed to initialize';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else if (exception instanceof PrismaClientValidationError) {
      name = 'Prisma Validation Error';
      message = 'Invalid Prisma query';
      stack = isDev ? exception.stack || defaultStack : defaultStack;
    } else {
      name = 'Unknown Error';
      message = isDev ? JSON.stringify(exception) : 'Something broke';
    }

    const responsePayload = {
      status,
      url: request.url,
      method: request.method,
      helper: {
        name,
        message,
        stack,
        context: {
          ip: request.ip as string,
          userAgent: request.headers['user-agent'] as string,
        },
      },
    };

    errorResponse(response, responsePayload);
  }
}

export default AllExceptionsFilter;
