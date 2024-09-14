import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty({
    type: [String],
    description: 'Array of error messages',
    example: [
      'Error data.',
    ],
  })
  message: string[];

  @ApiProperty({
    description: 'Error type',
    example: 'Bad Request',
  })
  error: string;

  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode: number;
}
