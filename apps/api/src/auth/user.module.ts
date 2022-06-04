import { AbilityModule } from '@api/ability/ability.module';
import { AuthModule } from '@api/auth/auth.module';
import { UserController } from '@api/auth/user.controller';
import { UserService } from '@api/auth/user.service';
import { UsersRepository } from '@api/auth/users.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    AuthModule,
    AbilityModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
