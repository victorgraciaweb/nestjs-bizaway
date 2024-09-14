import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateTripDto, ResponseCreateTripDto } from './dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TripCreationService } from './services/trip-creation.service';
import { TripSearchService } from './services/trip-search.service';
import { TripRemovalService } from './services/trip-removal.service';
import { ErrorDto } from 'src/common/dto/error.dto';

@ApiTags('Trips Management')
@Controller('trips')
export class TripsController {
  constructor(
    private readonly tripCreationService: TripCreationService,
    private readonly tripRemovalService: TripRemovalService,
    private readonly tripSearchService: TripSearchService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new trip' })
  @ApiResponse({ 
    status: 201, 
    description: 'The trip has been successfully created.',
    type: ResponseCreateTripDto,
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request if query parameters are invalid.',
    type: ErrorDto,
  })
  create(@Body() createTripDto: CreateTripDto): Promise<ResponseCreateTripDto> {
    return this.tripCreationService.create(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of trips with pagination' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Page number' })
  @ApiResponse({ 
    status: 200, 
    description: 'List of trips',
    type: ResponseCreateTripDto, 
    isArray: true,
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request if query parameters are invalid.',
    type: ErrorDto,
  })
  findAll(@Query() paginationDto: PaginationDto): Promise<ResponseCreateTripDto[]> {
    return this.tripSearchService.findAll(paginationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a trip by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the trip to be deleted' })
  @ApiResponse({ 
    status: 200, 
    description: 'The trip has been successfully deleted.',
    schema: {
      example: {
        message: 'Trip with id ":id" deleted successfully',
      },
    },
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request if query parameters are invalid.',
    type: ErrorDto,
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Bad request if query parameters are invalid.',
    type: ErrorDto,
  })
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.tripRemovalService.remove(id);
  }
}
