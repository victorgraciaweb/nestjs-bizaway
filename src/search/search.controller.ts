import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchTripDto } from './dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  /**
   * Finds trips that match the search criteria.
   * @param searchTripDto - Object containing the search criteria.
   * @returns An array of trips that match the search criteria.
   */
  @Get()
  findTrips(@Query() searchTripDto: SearchTripDto) {
    return this.searchService.findTrips(searchTripDto);
  }
}
