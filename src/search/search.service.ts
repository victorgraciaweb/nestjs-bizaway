import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchTripDto } from './dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { TripsResponse } from './interfaces/trips-response.interface';

@Injectable()
export class SearchService {

  private urlBizaway: string;
  private apiKeyBizaway: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService
  ) { 
    this.urlBizaway = configService.get<string>('urlBizaway');
    this.apiKeyBizaway = configService.get<string>('apiKeyBizaway');
  }

  async findTrips(searchTripDto: SearchTripDto) {
    const { origin, destination, sort_by } = searchTripDto;

    const response = await this.http.get<TripsResponse>(
      this.urlBizaway, {
      headers: { 
        'x-api-key': this.apiKeyBizaway
      },
      params: { 
        origin, 
        destination 
      }
    });

    const sortedTrips = response.sort((a, b) => {
      if (sort_by === 'fastest') {
        return a.duration - b.duration;
      } else if (sort_by === 'cheapest') {
        return a.cost - b.cost
      } else {
        return 0;
      }
    });

    return sortedTrips;
  }
}
