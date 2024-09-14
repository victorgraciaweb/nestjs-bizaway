import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTripDto } from '../dto';
import { Trip } from '../entities/trip.entity';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';


@Injectable()
export class TripCreationService {

  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>,
    private readonly exceptionHandlerService: ExceptionHandlerService
  ) { }

  async create(createTripDto: CreateTripDto) {
    try {
      const trip = await this.tripModel.create(createTripDto);
      return trip;

    } catch (error) {
      this.exceptionHandlerService.handleExceptions(error);
    }
  }
}
