import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from '../services/search.service';
import { SearchTripDto, ResponseSearchTripDto } from '../dto';
import { BadRequestException } from '@nestjs/common';
describe('SearchController', () => {
  let controller: SearchController;
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: {
            findTrips: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    service = module.get<SearchService>(SearchService);
  });

  describe('findTrips', () => {
    it('should return an array of trips', async () => {
      const queryDto: SearchTripDto = { origin: 'NYC', destination: 'LAX', sort_by: 'fastest' };
      const result: ResponseSearchTripDto[] = [
        { id: '1', origin: 'NYC', destination: 'LAX', cost: 300, duration: 360, type: 'flight', display_name: 'Flight NYC to LAX' },
      ];

      jest.spyOn(service, 'findTrips').mockResolvedValue(result);

      expect(await controller.findTrips(queryDto)).toBe(result);
    });

    it('should throw BadRequestException if query parameters are invalid', async () => {
      const queryDto: SearchTripDto = { origin: '', destination: '', sort_by: 'fastest' };

      jest.spyOn(service, 'findTrips').mockRejectedValue(new BadRequestException('Bad request'));

      await expect(controller.findTrips(queryDto)).rejects.toThrow(BadRequestException);
    });

    it('should handle unexpected errors', async () => {
      const queryDto: SearchTripDto = { origin: 'NYC', destination: 'LAX', sort_by: 'fastest' };

      jest.spyOn(service, 'findTrips').mockRejectedValue(new Error('Unexpected error'));

      await expect(controller.findTrips(queryDto)).rejects.toThrow(Error);
    });
  });
});
