import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, Length, Validate } from "class-validator";
import { IsIataCode } from "src/common/validators/iata-code.validator";

export class CreateTripDto {
    @ApiProperty()
    @IsString()
    @Length(3, 3, { message: 'Origin must be exactly 3 characters long.' })
    @Validate(IsIataCode)
    origin: string;
  
    @ApiProperty()
    @IsString()
    @Length(3, 3, { message: 'Destination must be exactly 3 characters long.' })
    @Validate(IsIataCode)
    destination: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    cost: number;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    duration: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    display_name: string;
}
