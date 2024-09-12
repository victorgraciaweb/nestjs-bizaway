import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchTripDto } from './dto/search-trip.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  findAll() {
    return this.searchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchService.findOne(+id);
  }
}
