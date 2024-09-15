import { Test, TestingModule } from '@nestjs/testing';
import { TripRemovalService } from './trip-removal.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip } from '../entities/trip.entity';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';
import { NotFoundException } from '@nestjs/common';

// Mock de ExceptionHandlerService
const mockExceptionHandlerService = {
  handleExceptions: jest.fn(),
};

// Mock de la modelo de Mongoose
const mockTripModel = {
  deleteOne: jest.fn(),
};

describe('TripRemovalService', () => {
  let service: TripRemovalService;
  let model: Model<Trip>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripRemovalService,
        { provide: getModelToken(Trip.name), useValue: mockTripModel },
        { provide: ExceptionHandlerService, useValue: mockExceptionHandlerService },
      ],
    }).compile();

    service = module.get<TripRemovalService>(TripRemovalService);
    model = module.get<Model<Trip>>(getModelToken(Trip.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('remove', () => {
    it('should delete a trip and return success message', async () => {
      const id = 'some-id';
      mockTripModel.deleteOne.mockResolvedValue({ deletedCount: 1 });
      
      const result = await service.remove(id);
      
      expect(mockTripModel.deleteOne).toHaveBeenCalledWith({ _id: id });
      expect(result).toEqual({ message: `Trip with id "${id}" deleted successfully` });
    });

    it('should call handleExceptions if trip is not found', async () => {
      const id = 'some-id';
      mockTripModel.deleteOne.mockResolvedValue({ deletedCount: 0 });

      await service.remove(id);

      expect(mockExceptionHandlerService.handleExceptions).toHaveBeenCalledWith(
        new NotFoundException(`Trip with id "${id}" not found`)
      );
    });

    it('should call handleExceptions if an error occurs', async () => {
      const id = 'some-id';
      const error = new Error('Some error');
      mockTripModel.deleteOne.mockRejectedValue(error);

      await service.remove(id);

      expect(mockExceptionHandlerService.handleExceptions).toHaveBeenCalledWith(error);
    });
  });
});
