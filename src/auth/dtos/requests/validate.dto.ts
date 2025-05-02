import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';
import { IsAuthProvider } from 'src/common/decorators/IsAuthProvider';

export class ValidateRequestDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsUrl()
  photo?: string;

  @IsAuthProvider()
  provider: 'google';

  @IsString()
  providerId: string;
}
