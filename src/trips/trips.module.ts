import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TripsController } from './trips.controller';
import { Trip, TripSchema } from './entities/trip.entity';
import { TripCreationService } from './services/trip-creation.service';
import { TripSearchService } from './services/trip-search.service';
import { TripRemovalService } from './services/trip-removal.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Trip.name,
        schema: TripSchema,
      },
    ])
  ],
  controllers: [TripsController],
  providers: [
    TripCreationService,
    TripSearchService,
    TripRemovalService,
  ],
})
export class TripsModule {}
