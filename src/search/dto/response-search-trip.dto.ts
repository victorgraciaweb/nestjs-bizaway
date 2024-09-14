import { ApiProperty } from '@nestjs/swagger';

export class ResponseSearchTripDto {
  @ApiProperty({
    description: 'The unique identifier for the trip',
    example: 'dedd7b3c-600d-43e5-a579-41c913230aa0'
  })
  id: string;

  @ApiProperty({
    description: 'The origin IATA code of the trip',
    example: 'FRA'
  })
  origin: string;

  @ApiProperty({
    description: 'The destination IATA code of the trip',
    example: 'LAX'
  })
  destination: string;

  @ApiProperty({
    description: 'The cost of the trip',
    example: 250
  })
  cost: number;

  @ApiProperty({
    description: 'The duration of the trip in minutes',
    example: 120
  })
  duration: number;

  @ApiProperty({
    description: 'The type of the trip',
    example: 'Economy'
  })
  type: string;

  @ApiProperty({
    description: 'The display name of the trip',
    example: 'FRA to LAX Trip'
  })
  display_name: string;
}
