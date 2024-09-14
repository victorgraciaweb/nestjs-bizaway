import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Trip } from '../entities/trip.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@Injectable()
export class TripSearchService {

  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>,
    private readonly exceptionHandlerService: ExceptionHandlerService
  ) { }

  findAll(paginationDto: PaginationDto) {
    const { limit = 5, offset = 0 } = paginationDto;

    return this.tripModel.find()
    .limit(limit)
    .skip(offset)
    .sort({
      cost: 1
    })
    .select('-__v')
  }
}
