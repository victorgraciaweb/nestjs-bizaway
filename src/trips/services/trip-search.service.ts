import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Trip } from '../entities/trip.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { ResponseCreateTripDto } from '../dto/response-create-trip.dto';

@Injectable()
export class TripSearchService {

  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>,
    private readonly exceptionHandlerService: ExceptionHandlerService
  ) { }

  async findAll(paginationDto: PaginationDto): Promise<ResponseCreateTripDto[]> {
    const { limit = 5, offset = 0 } = paginationDto;

    try {
      const trips = await this.tripModel.find()
        .limit(limit)
        .skip(offset)
        .sort({ cost: 1 })
        
        return trips.map(trip => this.mapToResponseCreateTripDto(trip));

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
