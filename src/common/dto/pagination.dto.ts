import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @ApiPropertyOptional({
        description: 'Number of items to return per page',
        example: 10,
        type: Number,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Limit must be a number.' })
    @IsPositive({ message: 'Limit must be a positive number.' })
    @Min(1, { message: 'Limit must be greater than 0.' })
    limit?: number;

    @ApiPropertyOptional({
        description: 'Number of items to skip before starting to collect the result set',
        example: 0,
        type: Number,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Offset must be a number.' })
    @IsPositive({ message: 'Offset must be a positive number.' })
    offset?: number;
}