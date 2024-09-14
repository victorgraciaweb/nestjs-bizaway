import { ApiProperty } from '@nestjs/swagger';

export class ResponseSearchTripDto {
  @ApiProperty({
    description: 'The unique identifier of the trip',
    example: '605c72ef3f1b2c001f4e3c6b'
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

  @ApiProperty({
    description: 'The creation timestamp of the trip',
    example: '2024-09-14T12:34:56.789Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The last update timestamp of the trip',
    example: '2024-09-15T12:34:56.789Z'
  })
  updatedAt: Date;
}
