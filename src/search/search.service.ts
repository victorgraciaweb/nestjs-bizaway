import { Injectable } from '@nestjs/common';

import { SearchTripDto } from './dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { TripsResponse } from './interfaces/trips-response.interface';

@Injectable()
export class SearchService {

  constructor(
    private readonly http: AxiosAdapter
  ) { }

  async findTrips(searchTripDto: SearchTripDto) {
    const { origin, destination, sort_by } = searchTripDto;

    const response = await this.http.get<TripsResponse>('https://z0qw1e7jpd.execute-api.eu-west-1.amazonaws.com/default/trips', {
      headers: { 'x-api-key': 'fgy6fd9I316DSDD090Shj4eG1DUxuxpI8sZlAOg1' },
      params: { origin, destination }
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
