import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from 'src/user/dtos/responses/user.dto';
import { UserService } from 'src/user/user.service';
import { UserProfile } from './interfaces/user-profile.interface';
import { User } from 'src/common/interfaces/user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginWithGoogleResponseDto } from './dtos/responses/login-with-google.dto';
import { RefreshAccessTokenResponseDto } from './dtos/responses/refresh-access-token.dto';
import { RefreshAccessTokenRequestDto } from './dtos/requests/refresh-access-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(userProfile: UserProfile): Promise<UserResponseDto> {
    const { email, firstName, lastName, photo, provider, providerId } =
      userProfile;
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

  loginWithGoogle(user: User): LoginWithGoogleResponseDto {
    const payload: JwtPayload = {
      sub: user.id,
      provider: user.provider,
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
