import { Module } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { SearchController } from './search.controller';
import { CommonModule } from 'src/common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    CommonModule
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
