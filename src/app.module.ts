import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';
import { SearchModule } from './search/search.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [TripsModule, SearchModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule { }