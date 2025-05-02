import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshAccessTokenRequestDto {
  @ApiProperty({
    description:
      'JWT refresh token used to obtain a new access token when the current one expires',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMjM0YjRmZi1hMzI5LTQxOWEtYjQ0Yy1hOTE2MDkyNGU4YTUiLCJwcm92aWRlciI6Imdvb2dsZSIsImlhdCI6MTc0NjE4Nzk5NiwiZXhwIjoxNzQ2NzkyNzk2fQ.TBmKbvC0ljM82iPX57MGdnS33qpa91XdlAgGjRSXGDs',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
