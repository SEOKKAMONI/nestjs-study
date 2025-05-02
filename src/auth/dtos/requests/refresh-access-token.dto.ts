import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshAccessTokenRequestDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
