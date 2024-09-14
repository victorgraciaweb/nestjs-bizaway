import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Trip } from '../entities/trip.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TripSearchService {

  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>
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

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Trip exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Trip - Check server logs`);
  }
}
