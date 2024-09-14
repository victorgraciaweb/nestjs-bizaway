import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';

import { CreateTripDto } from './dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TripCreationService } from './services/trip-creation.service';
import { TripSearchService } from './services/trip-search.service';
import { TripRemovalService } from './services/trip-removal.service';

@Controller('trips')
export class TripsController {
  constructor(
    private readonly tripCreationService: TripCreationService,
    private readonly tripRemovalService: TripRemovalService,
    private readonly tripSearchService: TripSearchService
  ) { }

  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripCreationService.create(createTripDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.tripSearchService.findAll(paginationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.tripRemovalService.remove(id);
  }
}
