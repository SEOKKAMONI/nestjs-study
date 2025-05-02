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
import { RefreshAccessTokenRequestDto } from './dtos/requests/refresh-access-token.dto';
import { LoginWithGoogleResponseDto } from './dtos/responses/login-with-google.dto';
import { RefreshAccessTokenResponseDto } from './dtos/responses/refresh-access-token.dto';
import { LoginWithGoogleRequestDto } from './dtos/requests/login-with-google.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthCallback(@Req() request: Request): LoginWithGoogleResponseDto {
    if (!request.user) {
      throw new UnauthorizedException(
        'User was not found after Google authentication.',
      );
    }
    return this.authService.loginWithGoogle(
      request.user as LoginWithGoogleRequestDto,
    );
  }

  @Post('refresh')
  refreshAccessToken(
    @Body() refreshAccessTokenRequestDto: RefreshAccessTokenRequestDto,
  ): RefreshAccessTokenResponseDto {
    return this.authService.refreshAccessToken(refreshAccessTokenRequestDto);
  }
}
