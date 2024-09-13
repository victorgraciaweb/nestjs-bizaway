import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTripDto } from './dto';
import { Trip } from './entities/trip.entity';

@Injectable()
export class TripsService {

  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>
  ) { }

  async create(createTripDto: CreateTripDto) {
    try {
      const trip = await this.tripModel.create(createTripDto);
      return trip;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all trips`;
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Trip exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Trip - Check server logs`);
  }
}
