import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

@Injectable()
export class ExceptionHandlerService {

  handleExceptions(error: any): never {
    if (error.code === 11000) {
      // Handle database duplicate entry error
      throw new BadRequestException(`Entry exists in db ${JSON.stringify(error.keyValue)}`);
    } else if (error.response && error.response.status === 404) {
      // Handle resource not found error
      throw new NotFoundException('Resource not found');
    } else if (error.response && error.response.status === 409) {
      // Handle conflict error, such as trying to create a resource that already exists
      throw new ConflictException('Conflict occurred with the request');
    } else {
      // Handle internal server errors
      console.error('Unexpected error:', error);
      throw new InternalServerErrorException(`An error occurred - Check server logs`);
    }
  }
}