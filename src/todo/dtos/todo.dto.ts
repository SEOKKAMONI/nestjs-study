import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class TodoDto {
  @ApiProperty({
    description: 'The id of the todo',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
  })
  @MinLength(1)
  @MaxLength(255)
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Whether the todo is completed',
    example: false,
    default: false,
  })
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty({
    description: 'The created at date of the todo',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'The updated at date of the todo',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDate()
  updatedAt: Date;
}

export class TodoResponseDto extends TodoDto {}
