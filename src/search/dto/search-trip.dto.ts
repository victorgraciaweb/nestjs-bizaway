import { IsIn, IsOptional, IsString, Length, Matches, Validate } from "class-validator";
import { IsIataCode } from "src/common/validators/iata-code.validator";

export class SearchTripDto {
  @IsString()
  @Length(3, 3, { message: 'Origin must be exactly 3 characters long.' })
  @Validate(IsIataCode)
  origin: string;

  @IsString()
  @Length(3, 3, { message: 'Destination must be exactly 3 characters long.' })
  @Validate(IsIataCode)
  destination: string;

  @IsOptional()
  @IsIn(['cheapest', 'fastest'], { message: 'Sort by must be either "cheapest" or "fastest".' })
  sort_by?: 'fastest' | 'cheapest';
}