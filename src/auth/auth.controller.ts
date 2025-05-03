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
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  RefreshAccessTokenRequestDto,
  RefreshAccessTokenResponseDto,
} from './dtos/refresh-access-token.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @HttpCode(302)
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Redirect to Google for authentication' })
  @ApiResponse({ status: 302, description: 'Redirected to Google OAuth page' })
  googleAuth() {}

  @Get('google/callback')
  @HttpCode(302)
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Handle Google OAuth callback' })
  @ApiResponse({
    status: 302,
    description:
      'Successfully authenticated with Google. Redirects to the frontend with access and refresh tokens as query parameters.',
  })
  googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new UnauthorizedException('User was not found after Google auth.');
    }

    const loginWithGoogleRequestDto = {
      userId: req.user.id,
      provider: req.user.provider,
    };

    const { accessToken, refreshToken } = this.authService.loginWithGoogle(
      loginWithGoogleRequestDto,
    );
    res.redirect(
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
