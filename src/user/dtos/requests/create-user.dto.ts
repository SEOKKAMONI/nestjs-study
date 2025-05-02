import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUserRequestDto {
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
}
