import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import {JwtModule, JwtService} from '@nestjs/jwt';
import { JwtStartegy } from './jwt.startegy';
import {JWT_MODULE_OPTIONS} from "@nestjs/jwt/dist/jwt.constants";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
      /*JwtModule.register({
      secret: 'topSecret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UsersRepository]),*/
  ],
  providers: [JwtService,AuthService, JwtStartegy],
  controllers: [AuthController],
  exports: [JwtStartegy, PassportModule],
})
export class AuthModule {}
