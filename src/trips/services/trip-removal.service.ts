import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Trip } from '../entities/trip.entity';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@Injectable()
export class TripRemovalService {

  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>,
    private readonly exceptionHandlerService: ExceptionHandlerService
  ) { }

  async remove(id: string) {
    try {
      const { deletedCount } = await this.tripModel.deleteOne({ _id: id }).exec();
      if (deletedCount === 0) {
        this.exceptionHandlerService.handleExceptions(new NotFoundException(`Trip with id "${id}" not found`));
      }
      return { message: `Trip with id "${id}" deleted successfully` };
    } catch (error) {
      this.exceptionHandlerService.handleExceptions(error);
    }
  }
}
