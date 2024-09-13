import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto';

@Injectable()
export class TripsService {
  create(createTripDto: CreateTripDto) {
    return 'This action adds a new trip';
  }

  findAll() {
    return `This action returns all trips`;
  }

  remove(id: number) {
    return `This action removes a #${id} trip`;
  }
}
