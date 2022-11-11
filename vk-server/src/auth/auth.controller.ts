import { Controller, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Get('google')
  @Auth()
  async googleAut(@Req() req) {
  }

  @Get('google/redirect')
  @Auth()
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}

