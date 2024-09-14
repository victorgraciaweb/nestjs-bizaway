import { Injectable } from '@nestjs/common';
import { Trip } from '../../trips/entities/trip.entity';
import { ResponseCreateTripDto } from '../../trips/dto';
import { ResponseSearchTripDto } from 'src/search/dto';
import { TripsResponse } from 'src/search/interfaces/trips-response.interface';

@Injectable()
export class MappingService {

  mapToResponseCreateTripDto(trip: Trip): ResponseCreateTripDto {
    const responseDto = new ResponseCreateTripDto();
    responseDto._id = trip._id.toString();
    responseDto.origin = trip.origin;
    responseDto.destination = trip.destination;
    responseDto.cost = trip.cost;
    responseDto.duration = trip.duration;
    responseDto.type = trip.type;
    responseDto.display_name = trip.display_name;

    return responseDto;
  }

  mapToResponseSearchTripDto(response: TripsResponse): ResponseSearchTripDto[] {
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
