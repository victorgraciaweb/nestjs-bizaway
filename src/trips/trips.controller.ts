import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { TripsService } from './trips.service';
import { CreateTripDto } from './dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) { }

  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tripsService.findAll(paginationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.tripsService.remove(id);
  }
}
