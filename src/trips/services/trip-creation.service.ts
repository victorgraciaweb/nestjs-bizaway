import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTripDto, ResponseCreateTripDto } from '../dto';
import { Trip } from '../entities/trip.entity';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { MappingService } from 'src/common/services/mapping.service';

@Injectable()
export class TripCreationService {

  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>,
    private readonly exceptionHandlerService: ExceptionHandlerService,
    private readonly mappingService: MappingService
  ) { }

  async create(createTripDto: CreateTripDto): Promise<ResponseCreateTripDto> {
    try {
      const trip = await this.tripModel.create(createTripDto);

      const responseDto = this.mappingService.mapToResponseCreateTripDto(trip);

      return responseDto;

    } catch (error) {
      this.exceptionHandlerService.handleExceptions(error);
    }
  }
}
