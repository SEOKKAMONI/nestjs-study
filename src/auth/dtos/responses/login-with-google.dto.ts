import { IsString } from 'class-validator';

export class LoginWithGoogleResponseDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
