import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './strategies/jwt.strategy';
import {
  LoginWithGoogleResponseDto,
  LoginWithGoogleRequestDto,
} from './dtos/login-with-google.dto';
import {
  RefreshAccessTokenResponseDto,
  RefreshAccessTokenRequestDto,
} from './dtos/refresh-access-token.dto';
import { ValidateRequestDto, ValidateResponseDto } from './dtos/validate.dto';

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
      userId,
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
      { userId: payload.userId, provider: payload.provider },
      { expiresIn: '1h' },
    );

    return { accessToken };
  }
}
