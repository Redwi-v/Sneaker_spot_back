import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('register')
  async register(@Body() authData: AuthDto, @Res() res: Response) {
    const userData = await this.authService.register(authData);

    res.cookie('refresh-jwt', userData.refreshToken, {
      httpOnly: true,
      secure: false,
    });
    res.cookie('access-jwt', userData.accessToken, {
      httpOnly: true,
      secure: false,
    });

    return res.json(userData);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() authData: AuthDto, @Res() res: Response) {
    const userData = await this.authService.login(authData);

    res.cookie('refresh-jwt', userData.refreshToken, {
      httpOnly: true,
      secure: false,
    });
    res.cookie('access-jwt', userData.accessToken, {
      httpOnly: true,
      secure: false,
    });

    return res.json(userData);
  }

  @HttpCode(200)
  @Post('login/access-token')
  async getTokens(@Req() request: Request, @Res() res: Response) {
    const tokenData = {
      refreshToken: request.cookies['refresh-jwt'],
    };

    const userData = await this.authService.getTokens(tokenData);

    res.cookie('refresh-jwt', userData.refreshToken, {
      httpOnly: true,
      secure: false,
    });
    res.cookie('access-jwt', userData.accessToken, {
      httpOnly: true,
      secure: false,
    });

    return res.json(userData);
  }
}
