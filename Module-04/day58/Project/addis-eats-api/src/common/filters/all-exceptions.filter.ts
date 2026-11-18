import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Request, Response } from 'express';
import { DishNotOnMenuError } from '../../dishes/dish.errors';
import {
  InvalidTransitionError,
  PaymentDeclinedError,
} from '../../orders/order.errors';
import { RestaurantClosedError } from '../../restaurants/restaurant.errors';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const { status, message } = this.translate(exception);

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
      requestId: request.headers['x-request-id'] ?? null,
    });
  }

  private translate(exception: unknown): {
    status: number;
    message: unknown;
  } {
    if (exception instanceof HttpException) {
      const body = exception.getResponse();

      return {
        status: exception.getStatus(),
        message:
          typeof body === 'object' && body !== null && 'message' in body
            ? (body as { message: unknown }).message
            : exception.message,
      };
    }

    if (exception instanceof ResourceNotFoundError) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: exception.message,
      };
    }

    if (
      exception instanceof RestaurantClosedError ||
      exception instanceof InvalidTransitionError
    ) {
      return {
        status: HttpStatus.CONFLICT,
        message: exception.message,
      };
    }

    if (exception instanceof DishNotOnMenuError) {
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: exception.message,
      };
    }

    if (exception instanceof PaymentDeclinedError) {
      return {
        status: HttpStatus.PAYMENT_REQUIRED,
        message: exception.message,
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };
  }
}
