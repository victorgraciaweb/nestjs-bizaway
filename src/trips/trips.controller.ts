import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) { }

  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripsService.remove(+id);
  }
}
