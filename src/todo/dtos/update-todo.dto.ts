import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTodoRequestDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
  })
  @MinLength(1)
  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Whether the todo is completed',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;
}
