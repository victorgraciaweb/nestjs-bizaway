import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';

import { TripsModule } from './trips/trips.module';
import { SearchModule } from './search/search.module';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    TripsModule, 
    SearchModule, 
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }