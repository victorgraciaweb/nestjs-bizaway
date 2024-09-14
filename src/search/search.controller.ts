import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { SearchTripDto } from './dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  findTrips(@Query() searchTripDto: SearchTripDto) {
    return this.searchService.findTrips(searchTripDto);
  }
}
