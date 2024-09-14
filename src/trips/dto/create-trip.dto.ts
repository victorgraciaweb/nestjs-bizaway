import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, Length, Validate } from "class-validator";
import { IsIataCode } from "src/common/validators/iata-code.validator";

export class CreateTripDto {
    @ApiProperty({
        description: 'The origin IATA code of the trip',
        example: 'NYC'
    })
    @IsString()
    @Length(3, 3, { message: 'Origin must be exactly 3 characters long.' })
    @Validate(IsIataCode)
    origin: string;
  
    @ApiProperty({
        description: 'The destination IATA code of the trip',
        example: 'LAX'
    })
    @IsString()
    @Length(3, 3, { message: 'Destination must be exactly 3 characters long.' })
    @Validate(IsIataCode)
    destination: string;

    @ApiProperty({
        description: 'The cost of the trip',
        example: 250
    })
    @IsNumber()
    @IsPositive()
    cost: number;

    @ApiProperty({
        description: 'The duration of the trip in minutes',
        example: 120
    })
    @IsNumber()
    @IsPositive()
    duration: number;

    @ApiProperty({
        description: 'The type of the trip',
        example: 'Economy'
    })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({
        description: 'The display name of the trip',
        example: 'NYC to LAX Trip'
    })
    @IsString()
    @IsNotEmpty()
    display_name: string;
}
