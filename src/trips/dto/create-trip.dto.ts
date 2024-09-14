import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, Length, Validate } from "class-validator";
import { IsIataCode } from "src/common/validators/iata-code.validator";

export class CreateTripDto {
    @IsString()
    @Length(3, 3, { message: 'Origin must be exactly 3 characters long.' })
    @Validate(IsIataCode)
    origin: string;
  
    @IsString()
    @Length(3, 3, { message: 'Destination must be exactly 3 characters long.' })
    @Validate(IsIataCode)
    destination: string;

    @IsNumber()
    @IsPositive()
    cost: number;

    @IsNumber()
    @IsPositive()
    duration: number;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    display_name: string;
}
