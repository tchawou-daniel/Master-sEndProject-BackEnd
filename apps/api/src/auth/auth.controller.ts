import {
  Body, Controller, Post, Req, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import {Logger} from '@nestjs/common'
import {CreateUserDto} from "@api/auth/dto/create-user.dto";
import {LoginUserDto} from "@api/auth/dto/login-user.dto";

@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body('user') createUserDto: CreateUserDto): Promise<void> {
    this.logger.verbose(`User "${createUserDto}"`)

    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  signIn(
    @Body('user') loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(`User "${loginUserDto}"`)
    return this.authService.signIn(loginUserDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
