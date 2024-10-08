import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TripsController } from './controllers/trips.controller';
import { Trip, TripSchema } from './entities/trip.entity';
import { TripCreationService } from './services/trip-creation.service';
import { TripSearchService } from './services/trip-search.service';
import { TripRemovalService } from './services/trip-removal.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    CommonModule,
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
