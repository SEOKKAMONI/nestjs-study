import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateUserRequestDto {
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
    description: 'The photo of the user',
    example: 'https://lh3.googleusercontent.com/...',
  })
  @IsOptional()
  @IsUrl()
  photo?: string;
}
