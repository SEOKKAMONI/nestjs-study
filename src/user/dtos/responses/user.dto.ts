import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
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
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'The firstName of the user',
    example: 'kim',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: 'The lastName of the user',
    example: 'seokjin',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'The photo of the user',
    example: 'https://lh3.googleusercontent.com/...',
  })
  @IsOptional()
  @IsUrl()
  photo?: string;

  @ApiProperty({
    description: 'The provider of the user',
    example: 'google',
  })
  @IsEnum(['google'])
  provider: 'google';

  @ApiProperty({
    description: 'The providerId of the user',
    example: '123456789012345678901',
  })
  @IsString()
  providerId: string;

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
