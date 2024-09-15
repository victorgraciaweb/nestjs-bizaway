import { BadRequestException, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ExceptionHandlerService } from './exception-handler.service';

describe('ExceptionHandlerService', () => {
  let service: ExceptionHandlerService;

  beforeEach(() => {
    service = new ExceptionHandlerService();
  });

  it('should throw BadRequestException for duplicate entry errors', () => {
    const error = { code: 11000, keyValue: { email: 'test@example.com' } };
    expect(() => service.handleExceptions(error)).toThrow(
      new BadRequestException('Entry already exists in the database: {"email":"test@example.com"}')
    );
  });

  it('should throw NotFoundException if error is an instance of NotFoundException', () => {
    const error = new NotFoundException('Resource not found');
    expect(() => service.handleExceptions(error)).toThrow(error);
  });

  it('should throw ConflictException for conflict errors', () => {
    const error = { response: { status: 409 } };
    expect(() => service.handleExceptions(error)).toThrow(
      new ConflictException('Conflict occurred with the request')
    );
  });

  it('should throw InternalServerErrorException for all other errors', () => {
    const error = { message: 'Some unexpected error' };
    expect(() => service.handleExceptions(error)).toThrow(
      new InternalServerErrorException('An unexpected error occurred - Check server logs for details')
    );
  });
});
