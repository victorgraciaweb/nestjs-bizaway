import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchTripDto } from './dto/search-trip.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  findOne(@Query() searchTripDto: SearchTripDto) {
    return this.searchService.findTrips(searchTripDto);
  }
}
