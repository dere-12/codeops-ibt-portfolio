import { Injectable, ValidationPipe } from '@nestjs/common';
import type { ArgumentMetadata, PipeTransform } from '@nestjs/common';

@Injectable()
export class RequestValidationPipe implements PipeTransform {
  private readonly writeValidationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: false,
    },
    stopAtFirstError: false,
    disableErrorMessages: false,
  });

  private readonly otherValidationPipe = new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: false,
    },
    stopAtFirstError: false,
    disableErrorMessages: false,
  });

  transform(value: unknown, metadata: ArgumentMetadata) {
    const validationPipe =
      metadata.type === 'body'
        ? this.writeValidationPipe
        : this.otherValidationPipe;

    return validationPipe.transform(value, metadata);
  }
}
