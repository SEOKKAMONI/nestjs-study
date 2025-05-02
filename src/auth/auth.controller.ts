import {
  Controller,
  Get,
  Req,
  UseGuards,
  UnauthorizedException,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RefreshAccessTokenRequestDto } from './dtos/requests/refresh-access-token.dto';
import { LoginWithGoogleResponseDto } from './dtos/responses/login-with-google.dto';
import { RefreshAccessTokenResponseDto } from './dtos/responses/refresh-access-token.dto';
import { LoginWithGoogleRequestDto } from './dtos/requests/login-with-google.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @HttpCode(302)
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Redirect to Google for authentication' })
  @ApiResponse({ status: 302, description: 'Redirected to Google OAuth page' })
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback' })
  @ApiResponse({
    status: 200,
    description: 'Login success with Google',
    type: LoginWithGoogleResponseDto,
  })
  googleAuthCallback(@Req() request: Request): LoginWithGoogleResponseDto {
    if (!request.user) {
      throw new UnauthorizedException('User was not found after Google auth.');
    }
    return this.authService.loginWithGoogle(
      request.user as LoginWithGoogleRequestDto,
    );
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Reissue access token using refresh token' })
  @ApiResponse({
    status: 201,
    description: 'New access token issued',
    type: RefreshAccessTokenResponseDto,
  })
  @ApiBody({ type: RefreshAccessTokenRequestDto })
  refreshAccessToken(
    @Body() refreshAccessTokenRequestDto: RefreshAccessTokenRequestDto,
  ): RefreshAccessTokenResponseDto {
    return this.authService.refreshAccessToken(refreshAccessTokenRequestDto);
  }
}
