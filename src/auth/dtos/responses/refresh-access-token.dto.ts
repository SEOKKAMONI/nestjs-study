import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshAccessTokenResponseDto {
  @ApiProperty({
    description: 'JWT access token used to authenticate API requests',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMjM0YjRmZi1hMzI5LTQxOWEtYjQ0Yy1hOTE2MDkyNGU4YTUiLCJwcm92aWRlciI6Imdvb2dsZSIsImlhdCI6MTc0NjE4Nzk5NiwiZXhwIjoxNzQ2MTkxNTk2fQ.H01rPxVY-LekXomM9wJztpRVOP-5q5r5506BWqUkoIY',
  })
  @IsString()
  accessToken: string;
}
