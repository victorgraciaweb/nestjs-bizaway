import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [TripsModule, SearchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}