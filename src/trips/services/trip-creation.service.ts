import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTripDto, ResponseCreateTripDto } from '../dto';
import { Trip } from '../entities/trip.entity';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@Injectable()
export class TripCreationService {

  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>,
    private readonly exceptionHandlerService: ExceptionHandlerService
  ) { }

  async create(createTripDto: CreateTripDto): Promise<ResponseCreateTripDto> {
    try {
      const trip = await this.tripModel.create(createTripDto);

      const responseDto = this.mapToResponseCreateTripDto(trip);

      return responseDto;

    } catch (error) {
      this.exceptionHandlerService.handleExceptions(error);
    }
  }

  private mapToResponseCreateTripDto(trip: Trip): ResponseCreateTripDto {
    const responseDto = new ResponseCreateTripDto();
    responseDto._id = trip._id.toString();
    responseDto.origin = trip.origin;
    responseDto.destination = trip.destination;
    responseDto.cost = trip.cost;
    responseDto.duration = trip.duration;
    responseDto.type = trip.type;
    responseDto.display_name = trip.display_name;

    return responseDto;
  }
}
