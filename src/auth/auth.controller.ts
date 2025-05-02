import {
  Controller,
  Get,
  Req,
  UseGuards,
  UnauthorizedException,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RefreshTokenRequestDto } from './dtos/requests/refresh-token.dto';
import { TokensResponseDto } from './dtos/responses/tokens.dto';
import { AccessTokenResponseDto } from './dtos/responses/access-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthCallback(@Req() req: Request): TokensResponseDto {
    if (!req.user) {
      throw new UnauthorizedException(
        'User was not found after Google authentication.',
      );
    }

    return this.authService.loginWithGoogle(req.user);
  }

  @Post('refresh')
  refreshAccessToken(
    @Body() refreshTokenRequestDto: RefreshTokenRequestDto,
  ): AccessTokenResponseDto {
    const { refreshToken } = refreshTokenRequestDto;
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided.');
    }

    return this.authService.refreshAccessToken(refreshToken);
  }
}
