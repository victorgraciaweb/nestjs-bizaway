import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SearchService } from './services/search.service';
import { SearchTripDto } from './dto';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiQuery({ name: 'origin', required: false, description: 'The origin of the trip' })
  @ApiQuery({ name: 'destination', required: false, description: 'The destination of the trip' })
  @ApiQuery({ name: 'sort_by', required: false, description: 'Sort the results by "fastest" or "cheapest"' })
  @ApiResponse({ status: 200, description: 'List of trips found based on the search criteria.' })
  @ApiResponse({ status: 400, description: 'Bad request if query parameters are invalid.' })
  findTrips(@Query() searchTripDto: SearchTripDto) {
    return this.searchService.findTrips(searchTripDto);
  }
}