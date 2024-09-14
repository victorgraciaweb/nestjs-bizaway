import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsOptional, IsString, Length, Matches, Validate } from "class-validator";
import { IsIataCode } from "src/common/validators/iata-code.validator";

export class SearchTripDto {
  @ApiProperty({
    description: 'The origin IATA code for the trip',
    example: 'FRA',
    type: String
  })
  @IsString()
  @Length(3, 3, { message: 'Origin must be exactly 3 characters long.' })
  @Validate(IsIataCode)
  origin: string;

  @ApiProperty({
    description: 'The destination IATA code for the trip',
    example: 'LAX',
    type: String
  })
  @IsString()
  @Length(3, 3, { message: 'Destination must be exactly 3 characters long.' })
  @Validate(IsIataCode)
  destination: string;

  @ApiPropertyOptional({
    description: 'Sort the results by "cheapest" or "fastest"',
    example: 'cheapest',
    enum: ['cheapest', 'fastest']
  })
  @IsOptional()
  @IsIn(['cheapest', 'fastest'], { message: 'Sort by must be either "cheapest" or "fastest".' })
  sort_by?: 'fastest' | 'cheapest';
}