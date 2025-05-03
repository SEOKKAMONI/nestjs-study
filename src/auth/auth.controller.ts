import {
  Controller,
  Get,
  Req,
  UseGuards,
  UnauthorizedException,
  Post,
  Body,
  HttpCode,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RefreshAccessTokenRequestDto } from './dtos/requests/refresh-access-token.dto';
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
  @HttpCode(302)
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Handle Google OAuth callback' })
  @ApiResponse({
    status: 302,
    description:
      'Successfully authenticated with Google. Redirects to the frontend with access and refresh tokens as query parameters.',
  })
  googleAuthCallback(@Req() request: Request, @Res() response: Response) {
    if (!request.user) {
      throw new UnauthorizedException('User was not found after Google auth.');
    }
    const { accessToken, refreshToken } = this.authService.loginWithGoogle(
      request.user as LoginWithGoogleRequestDto,
    );
    response.redirect(
      `http://localhost:3000/auth/google/success?access_token=${accessToken}&refresh_token=${refreshToken}`,
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
