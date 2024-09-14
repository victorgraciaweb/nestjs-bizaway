import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Trip } from '../entities/trip.entity';

@Injectable()
export class TripRemovalService {

  constructor(
    @InjectModel(Trip.name)
    private readonly tripModel: Model<Trip>
  ) { }

  async remove(id: string) {
    const { deletedCount } = await this.tripModel.deleteOne({ _id: id });
    if (deletedCount === 0) {
      throw new BadRequestException(`Trip with id "${id}" not found`);
    }

    return { message: `Trip with id "${id}" deleted successfully` };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Trip exists in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Trip - Check server logs`);
  }
}
