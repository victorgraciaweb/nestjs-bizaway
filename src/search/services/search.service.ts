import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SearchTripDto, ResponseSearchTripDto } from '../dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { TripsResponse } from '../interfaces/trips-response.interface';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@Injectable()
export class SearchService {
  private readonly urlBizaway: string;
  private readonly apiKeyBizaway: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly configService: ConfigService,
    private readonly exceptionHandler: ExceptionHandlerService
  ) { 
    this.urlBizaway = this.configService.get<string>('urlBizaway');
    this.apiKeyBizaway = this.configService.get<string>('apiKeyBizaway');
  }

  async findTrips(searchTripDto: SearchTripDto): Promise<ResponseSearchTripDto[]> {
    try {
      const { origin, destination, sort_by } = searchTripDto;

      const response: TripsResponse = await this.http.get<TripsResponse>(this.urlBizaway, {
        headers: { 
          'x-api-key': this.apiKeyBizaway
        },
        params: { 
          origin, 
          destination 
        }
      });

      const trips = this.sortTrips(response, sort_by);

      return this.mapToResponseSearchTripDto(trips); 

    } catch (error) {
      this.exceptionHandler.handleExceptions(error);
    }
  }

  private sortTrips(trips: TripsResponse, sortBy: 'fastest' | 'cheapest'): TripsResponse {
    return trips.sort((a, b) => {
      if (sortBy === 'fastest') {
        return a.duration - b.duration;
      } else if (sortBy === 'cheapest') {
        return a.cost - b.cost;
      } else {
        return 0;
      }
    });
  }

  private mapToResponseSearchTripDto(response: TripsResponse): ResponseSearchTripDto[] {
    return response.map(trip => {
      const tripDto = new ResponseSearchTripDto();
      tripDto.id = trip.id;
      tripDto.origin = trip.origin;
      tripDto.destination = trip.destination;
      tripDto.cost = trip.cost;
      tripDto.duration = trip.duration;
      tripDto.type = trip.type;
      tripDto.display_name = trip.display_name;

      return tripDto;
    });
  }
}