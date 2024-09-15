import { Test, TestingModule } from '@nestjs/testing';
import { MappingService } from './mapping.service';
import { Trip } from '../../trips/entities/trip.entity';
import { ResponseCreateTripDto } from '../../trips/dto';
import { ResponseSearchTripDto } from 'src/search/dto';
import { TripsResponse } from 'src/search/interfaces/trips-response.interface';

describe('MappingService', () => {
  let service: MappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MappingService],
    }).compile();

    service = module.get<MappingService>(MappingService);
  });

  describe('mapToResponseCreateTripDto', () => {
    it('should map a Trip entity to ResponseCreateTripDto correctly', () => {
      const trip: Trip = {
        _id: 'some_id',
        origin: 'FRA',
        destination: 'BCN',
        cost: 100,
        duration: 5,
        type: 'train',
        display_name: 'Train from FRA to BCN',
      } as Trip;

      const result: ResponseCreateTripDto = service.mapToResponseCreateTripDto(trip);

      expect(result).toEqual({
        _id: 'some_id',
        origin: 'FRA',
        destination: 'BCN',
        cost: 100,
        duration: 5,
        type: 'train',
        display_name: 'Train from FRA to BCN',
      });
    });
  });

  describe('mapToResponseSearchTripDto', () => {
    it('should map a list of TripsResponse to ResponseSearchTripDto array correctly', () => {
      const tripsResponse: TripsResponse = [
        {
          id: '1',
          origin: 'FRA',
          destination: 'BCN',
          cost: 200,
          duration: 4,
          type: 'flight',
          display_name: 'Flight from FRA to BCN',
        },
        {
          id: '2',
          origin: 'FRA',
          destination: 'BCN',
          cost: 150,
          duration: 6,
          type: 'bus',
          display_name: 'Bus from FRA to BCN',
        },
      ];

      const result: ResponseSearchTripDto[] = service.mapToResponseSearchTripDto(tripsResponse);

      expect(result).toEqual([
        {
          id: '1',
          origin: 'FRA',
          destination: 'BCN',
          cost: 200,
          duration: 4,
          type: 'flight',
          display_name: 'Flight from FRA to BCN',
        },
        {
          id: '2',
          origin: 'FRA',
          destination: 'BCN',
          cost: 150,
          duration: 6,
          type: 'bus',
          display_name: 'Bus from FRA to BCN',
        },
      ]);
    });
  });
});
