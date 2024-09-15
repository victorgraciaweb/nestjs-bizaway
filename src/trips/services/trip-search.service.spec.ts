import { Test, TestingModule } from '@nestjs/testing';
import { TripSearchService } from './trip-search.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip } from '../entities/trip.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { MappingService } from 'src/common/services/mapping.service';
import { ResponseCreateTripDto } from '../dto';

describe('TripSearchService', () => {
  let service: TripSearchService;
  let tripModel: Model<Trip>;
  let exceptionHandlerService: ExceptionHandlerService;
  let mappingService: MappingService;

  // Mock implementations
  const mockFind = jest.fn().mockReturnThis();
  const mockSort = jest.fn().mockResolvedValue([
    { _id: '66e54f4746c7e4cffbbe5cc9', origin: 'FRA', destination: 'BCN', cost: 456, duration: 6, type: 'train', display_name: 'from FRA to BCN by train' },
    { _id: '66e562b88902d6d2fe049779', origin: 'FRA', destination: 'BCN', cost: 456, duration: 6, type: 'train', display_name: 'from FRA to BCN by train' },
  ]);
  const mockSkip = jest.fn().mockReturnThis();
  const mockLimit = jest.fn().mockReturnThis();

  const mockTripModel = {
    find: mockFind,
    limit: mockLimit,
    skip: mockSkip,
    sort: mockSort,
  };

  const mockExceptionHandlerService = {
    handleExceptions: jest.fn(),
  };

  const mockMappingService = {
    mapToResponseCreateTripDto: jest.fn().mockImplementation((trip) => ({
      ...trip
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripSearchService,
        { provide: getModelToken(Trip.name), useValue: mockTripModel },
        { provide: ExceptionHandlerService, useValue: mockExceptionHandlerService },
        { provide: MappingService, useValue: mockMappingService },
      ],
    }).compile();

    service = module.get<TripSearchService>(TripSearchService);
    tripModel = module.get<Model<Trip>>(getModelToken(Trip.name));
    exceptionHandlerService = module.get<ExceptionHandlerService>(ExceptionHandlerService);
    mappingService = module.get<MappingService>(MappingService);
  });

  describe('findAll', () => {
    it('should return a list of trips with pagination and sorting applied', async () => {
      const paginationDto: PaginationDto = { limit: 5, offset: 0 };

      const result: ResponseCreateTripDto[] = await service.findAll(paginationDto);

      // Verifications
      expect(mockFind).toHaveBeenCalled();
      expect(mockLimit).toHaveBeenCalledWith(paginationDto.limit);
      expect(mockSkip).toHaveBeenCalledWith(paginationDto.offset);
      expect(mockSort).toHaveBeenCalledWith({ cost: 1 });

      expect(mappingService.mapToResponseCreateTripDto).toHaveBeenCalledTimes(2);
      expect(result).toEqual([
        { _id: '66e54f4746c7e4cffbbe5cc9', origin: 'FRA', destination: 'BCN', cost: 456, duration: 6, type: 'train', display_name: 'from FRA to BCN by train' },
        { _id: '66e562b88902d6d2fe049779', origin: 'FRA', destination: 'BCN', cost: 456, duration: 6, type: 'train', display_name: 'from FRA to BCN by train' },
      ]);
    });

    it('should handle errors by delegating to ExceptionHandlerService', async () => {
      const paginationDto: PaginationDto = { limit: 5, offset: 0 };

      mockFind.mockImplementationOnce(() => ({
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        sort: jest.fn().mockRejectedValue(new Error('Database Error')),
      }));

      await expect(service.findAll(paginationDto)).resolves.toBeUndefined();
      expect(exceptionHandlerService.handleExceptions).toHaveBeenCalledWith(new Error('Database Error'));
    });
  });
});
