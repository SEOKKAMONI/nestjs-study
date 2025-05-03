import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './strategies/jwt.strategy';
import { LoginWithGoogleResponseDto } from './dtos/responses/login-with-google.dto';
import { RefreshAccessTokenResponseDto } from './dtos/responses/refresh-access-token.dto';
import { RefreshAccessTokenRequestDto } from './dtos/requests/refresh-access-token.dto';
import { ValidateRequestDto } from './dtos/requests/validate.dto';
import { LoginWithGoogleRequestDto } from './dtos/requests/login-with-google.dto';
import { ValidateResponseDto } from './dtos/responses/validate.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(
    validateRequestDto: ValidateRequestDto,
  ): Promise<ValidateResponseDto> {
    const { email, firstName, lastName, photo, provider, providerId } =
      validateRequestDto;
    let user = await this.userService.findOneByProviderId(providerId);
    if (!user) {
      user = await this.userService.create({
        email,
        firstName,
        lastName,
        photo,
        provider,
        providerId,
      });
    }
    return user;
  }

  loginWithGoogle(
    loginWithGoogleRequestDto: LoginWithGoogleRequestDto,
  ): LoginWithGoogleResponseDto {
    const { userId, provider } = loginWithGoogleRequestDto;
    const payload: JwtPayload = {
      sub: userId,
      provider,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  refreshAccessToken(
    refreshAccessTokenRequestDto: RefreshAccessTokenRequestDto,
  ): RefreshAccessTokenResponseDto {
    const { refreshToken } = refreshAccessTokenRequestDto;
    const payload: JwtPayload = this.jwtService.verify(refreshToken);
    const accessToken = this.jwtService.sign(
      { sub: payload.sub, provider: payload.provider },
      { expiresIn: '1h' },
    );

    return { accessToken };
  }
}
