import { IsString } from 'class-validator';

export class RefreshAccessTokenResponseDto {
  @IsString()
  accessToken: string;
}
