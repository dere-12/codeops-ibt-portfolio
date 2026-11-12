import { Catch, HttpStatus } from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

@Catch(ResourceNotFoundError)
export class ResourceNotFoundFilter implements ExceptionFilter<ResourceNotFoundError> {
  catch(exception: ResourceNotFoundError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      message: exception.message,
    });
  }
}
