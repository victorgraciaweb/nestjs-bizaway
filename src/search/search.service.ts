import { Injectable } from '@nestjs/common';
import { SearchTripDto } from './dto/search-trip.dto';

@Injectable()
export class SearchService {

  async findTrips(searchTripDto: SearchTripDto) {
    const { origin, destination, sort_by } = searchTripDto;

    // Llama al API de terceros con los parámetros de origen y destino
    /*const trips = await this.httpService.get('URL_DE_LA_API_DE_TERCEROS', {
      params: { origin, destination },
      headers: { 'x-api-key': 'TU_API_KEY' },
    }).toPromise();

    // Ordena los resultados en base al sort_by (duración o costo)
    if (sort_by === 'fastest') {
      return trips.data.sort((a, b) => a.duration - b.duration);
    } else if (sort_by === 'cheapest') {
      return trips.data.sort((a, b) => a.cost - b.cost);
    }

    return trips.data;*/
  }
}
