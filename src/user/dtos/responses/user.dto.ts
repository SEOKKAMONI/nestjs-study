import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';

export class UserResponseDto {
  @ApiProperty({
    description: 'The id of the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'example@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The firstName of the user',
    example: 'kim',
  })
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'The lastName of the user',
    example: 'seokjin',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'The profileImage of the user',
    example: 'https://lh3.googleusercontent.com/...',
  })
  @IsOptional()
  @IsUrl()
  profileImage?: string;

  @ApiProperty({
    description: 'The googleId of the user',
    example: '123456789012345678901',
  })
  @IsOptional()
  @IsString()
  googleId?: string;

  @ApiProperty({
    description: 'The created at date of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'The updated at date of the user',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDate()
  updatedAt: Date;
}
