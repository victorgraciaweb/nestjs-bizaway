import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Trip } from '../entities/trip.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { ResponseCreateTripDto } from '../dto';
import { MappingService } from 'src/common/services/mapping.service';

@Injectable()
export class TripSearchService {

  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>,
    private readonly exceptionHandlerService: ExceptionHandlerService,
    private readonly mappingService: MappingService
  ) { }

  async findAll(paginationDto: PaginationDto): Promise<ResponseCreateTripDto[]> {
    const { limit = 5, offset = 0 } = paginationDto;

    try {
      const trips = await this.tripModel.find()
        .limit(limit)
        .skip(offset)
        .sort({ cost: 1 })
        
        return trips.map(trip => this.mappingService.mapToResponseCreateTripDto(trip));

    } catch (error) {
      this.exceptionHandlerService.handleExceptions(error);
    }
  }
}
