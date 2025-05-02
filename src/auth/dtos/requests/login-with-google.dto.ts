import { IsString } from 'class-validator';
import { IsAuthProvider } from 'src/common/decorators/IsAuthProvider';

export class LoginWithGoogleRequestDto {
  @IsString()
  id: string;

  @IsAuthProvider()
  provider: 'google';
}
