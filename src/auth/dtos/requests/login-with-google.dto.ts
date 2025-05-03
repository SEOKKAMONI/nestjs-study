import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { IsAuthProvider } from 'src/common/decorators/IsAuthProvider';

export class LoginWithGoogleRequestDto {
  @ApiProperty({
    description: 'The id of the user',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The provider of the user',
    example: 'google',
  })
  @IsAuthProvider()
  provider: 'google';
}
