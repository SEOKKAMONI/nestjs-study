import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class UpdateTodoRequestDto {
  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries',
    type: String,
    minLength: 1,
    maxLength: 255,
  })
  @Column({ length: 255 })
  title: string;

  @ApiProperty({
    description: 'Whether the todo is completed',
    example: false,
    type: Boolean,
    default: false,
    required: false,
  })
  @Column({ default: false, nullable: true })
  isCompleted: boolean;
}
