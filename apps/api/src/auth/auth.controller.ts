import {
  Body, Controller, Post, Req, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {Logger} from '@nestjs/common'

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    this.logger.verbose(`User "${authCredentialsDto}"`)
    console.log(authCredentialsDto)

    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(`User "${authCredentialsDto}"`)
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
