import { Test, TestingModule } from '@nestjs/testing';
import { TripCreationService } from './trip-creation.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { MappingService } from 'src/common/services/mapping.service';
import { CreateTripDto, ResponseCreateTripDto } from '../dto';
import { Trip } from '../entities/trip.entity';

describe('TripCreationService', () => {
  let service: TripCreationService;
  let tripModel: Model<Trip>;
  let exceptionHandlerServiceMock: ExceptionHandlerService;
  let mappingServiceMock: MappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripCreationService,
        {
          provide: getModelToken(Trip.name),
          useValue: {
            create: jest.fn(), // Mock de Mongoose Model
          },
        },
        {
          provide: ExceptionHandlerService,
          useValue: {
            handleExceptions: jest.fn(),
          },
        },
        {
          provide: MappingService,
          useValue: {
            mapToResponseCreateTripDto: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TripCreationService>(TripCreationService);
    tripModel = module.get<Model<Trip>>(getModelToken(Trip.name));
    exceptionHandlerServiceMock = module.get<ExceptionHandlerService>(ExceptionHandlerService);
    mappingServiceMock = module.get<MappingService>(MappingService);
  });

  it('should create a trip and return a ResponseCreateTripDto', async () => {
    const createTripDto: CreateTripDto = {
      origin: 'FRA',
      destination: 'BCN',
      cost: 2026,
      duration: 14,
      type: 'car',
      display_name: 'from FRA to BCN by car',
    };

    const createdTrip = {
      ...createTripDto
    };

    const responseDto: ResponseCreateTripDto = {
      ...createdTrip,
      _id: 'some-id',
    };

    jest.spyOn(tripModel, 'create').mockResolvedValue(createdTrip as any);
    jest.spyOn(mappingServiceMock, 'mapToResponseCreateTripDto').mockReturnValue(responseDto);

    const result = await service.create(createTripDto);

    expect(tripModel.create).toHaveBeenCalledWith(createTripDto);
    expect(mappingServiceMock.mapToResponseCreateTripDto).toHaveBeenCalledWith(createdTrip);
    expect(result).toEqual(responseDto);
  });

  it('should handle exceptions', async () => {
    const createTripDto: CreateTripDto = {
      origin: 'FRA',
      destination: 'BCN',
      cost: 2026,
      duration: 14,
      type: 'car',
      display_name: 'from FRA to BCN by car',
    };

    const apiError = new Error('API Error');
    jest.spyOn(tripModel, 'create').mockRejectedValue(apiError);

    await service.create(createTripDto).catch((error) => {
      expect(exceptionHandlerServiceMock.handleExceptions).toHaveBeenCalledWith(apiError);
      expect(error).toEqual(apiError); // Asegúrate de que el error sea lanzado como se espera
    });
  });
});