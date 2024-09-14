import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ExceptionHandlerService {

  handleExceptions(error: any): never {
    if (error.code === 11000) {
      throw new BadRequestException(`Entry exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.error(error);
    throw new InternalServerErrorException(`An error occurred - Check server logs`);
  }
}