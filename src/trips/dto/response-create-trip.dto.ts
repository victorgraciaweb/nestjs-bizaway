import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateTripDto {
  @ApiProperty({
    description: 'The unique identifier of the trip',
    example: '66e5fb01c8990c37ee167669',
  })
  _id: string;
  
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