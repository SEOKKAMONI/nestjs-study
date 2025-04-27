import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class TodoResponseDto {
  @ApiProperty({
    description: 'The id of the todo',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  })
  @Column({ default: false })
  isCompleted: boolean;

  @ApiProperty({
    description: 'The created at date of the todo',
    example: '2021-01-01T00:00:00.000Z',
    type: Date,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'The updated at date of the todo',
    example: '2021-01-01T00:00:00.000Z',
    type: Date,
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
