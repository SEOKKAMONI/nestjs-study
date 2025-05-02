import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginWithGoogleResponseDto {
  @ApiProperty({
    description: 'JWT access token used to authenticate API requests',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMjM0YjRmZi1hMzI5LTQxOWEtYjQ0Yy1hOTE2MDkyNGU4YTUiLCJwcm92aWRlciI6Imdvb2dsZSIsImlhdCI6MTc0NjE4Nzk5NiwiZXhwIjoxNzQ2MTkxNTk2fQ.H01rPxVY-LekXomM9wJztpRVOP-5q5r5506BWqUkoIY',
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    description:
      'JWT refresh token used to obtain a new access token when the current one expires',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMjM0YjRmZi1hMzI5LTQxOWEtYjQ0Yy1hOTE2MDkyNGU4YTUiLCJwcm92aWRlciI6Imdvb2dsZSIsImlhdCI6MTc0NjE4Nzk5NiwiZXhwIjoxNzQ2NzkyNzk2fQ.TBmKbvC0ljM82iPX57MGdnS33qpa91XdlAgGjRSXGDs',
  })
  @IsString()
  refreshToken: string;
}
