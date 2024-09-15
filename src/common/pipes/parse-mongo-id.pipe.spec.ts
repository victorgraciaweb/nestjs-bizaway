import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ParseMongoIdPipe } from './parse-mongo-id.pipe';
import { isValidObjectId } from 'mongoose';

describe('ParseMongoIdPipe', () => {
  let pipe: ParseMongoIdPipe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParseMongoIdPipe],
    }).compile();

    pipe = module.get<ParseMongoIdPipe>(ParseMongoIdPipe);
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    it('should return the value if it is a valid MongoDB ObjectId', () => {
      const validObjectId = '60c72b2f9b1e8e001f6472f2';

      jest.mock('mongoose', () => ({
        isValidObjectId: jest.fn().mockReturnValue(true),
      }));

      expect(pipe.transform(validObjectId, { type: 'param', metatype: String })).toBe(validObjectId);
    });

    it('should throw BadRequestException if the value is not a valid MongoDB ObjectId', () => {
      const invalidObjectId = 'invalid_id';

      jest.mock('mongoose', () => ({
        isValidObjectId: jest.fn().mockReturnValue(false),
      }));

      expect(() => pipe.transform(invalidObjectId, { type: 'param', metatype: String }))
        .toThrow(new BadRequestException(`${invalidObjectId} is not a valid MongoID`));
    });
  });
});
