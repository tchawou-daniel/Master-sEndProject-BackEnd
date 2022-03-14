import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStartegy } from './jwt.startegy';
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
     imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
        expiresIn: 3600,
      },
      })
    }),

    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, JwtStartegy],
  controllers: [AuthController],
  exports: [JwtStartegy, PassportModule],
})
export class AuthModule {}
