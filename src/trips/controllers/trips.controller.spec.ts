import { Test, TestingModule } from '@nestjs/testing';
import { TripsController } from './trips.controller';
import { TripCreationService } from '../services/trip-creation.service';
import { TripSearchService } from '../services/trip-search.service';
import { TripRemovalService } from '../services/trip-removal.service';
import { CreateTripDto, ResponseCreateTripDto } from '../dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

describe('TripsController', () => {
  let controller: TripsController;
  let tripCreationService: TripCreationService;
  let tripSearchService: TripSearchService;
  let tripRemovalService: TripRemovalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        {
          provide: TripCreationService,
          useValue: { create: jest.fn() },
        },
        {
          provide: TripSearchService,
          useValue: { findAll: jest.fn() },
        },
        {
          provide: TripRemovalService,
          useValue: { remove: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<TripsController>(TripsController);
    tripCreationService = module.get<TripCreationService>(TripCreationService);
    tripSearchService = module.get<TripSearchService>(TripSearchService);
    tripRemovalService = module.get<TripRemovalService>(TripRemovalService);
  });

  describe('create', () => {
    it('should create a trip', async () => {
      const createTripDto: CreateTripDto = {
        origin: 'New York',
        destination: 'Los Angeles',
        cost: 299,
        duration: 5,
        type: 'economy',
        display_name: 'NY to LA',
      };
      const responseDto: ResponseCreateTripDto = {
        _id: '66e5fb01c8990c37ee167669',
        origin: 'New York',
        destination: 'Los Angeles',
        cost: 299,
        duration: 5,
        type: 'economy',
        display_name: 'NY to LA',
      };

      jest.spyOn(tripCreationService, 'create').mockResolvedValue(responseDto);

      expect(await controller.create(createTripDto)).toBe(responseDto);
    });
  });

  describe('findAll', () => {
    it('should return a list of trips', async () => {
      const paginationDto: PaginationDto = { 
        limit: 10,
        offset: 0,
       };
      const responseDtos: ResponseCreateTripDto[] = [ 
        {
          _id: '66e5fb01c8990c37ee167669',
          origin: 'New York',
          destination: 'Los Angeles',
          cost: 299,
          duration: 5,
          type: 'economy',
          display_name: 'NY to LA',
        },
        {
          _id: '66e5fb01c8990c37ee167669',
          origin: 'Chicago',
          destination: 'Houston',
          cost: 199,
          duration: 4,
          type: 'business',
          display_name: 'Chicago to Houston',
        }
      ];

      jest.spyOn(tripSearchService, 'findAll').mockResolvedValue(responseDtos);

      expect(await controller.findAll(paginationDto)).toBe(responseDtos);
    });
  });

  describe('remove', () => {
    it('should delete a trip', async () => {
      const id = 'some-id';
      jest.spyOn(tripRemovalService, 'remove').mockResolvedValue({ message: `Trip with id "${id}" deleted successfully` });

      expect(await controller.remove(id)).toEqual({ message: `Trip with id "${id}" deleted successfully` });
    });
  });
});
