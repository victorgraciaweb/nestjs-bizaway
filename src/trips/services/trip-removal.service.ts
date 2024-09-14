import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
    const { deletedCount } = await this.tripModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Trip with id "${id}" not found`);
    }

    return { message: `Trip with id "${id}" deleted successfully` };
  }
}
