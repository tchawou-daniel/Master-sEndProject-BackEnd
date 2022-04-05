import { AuthModule } from '@api/auth/auth.module';
import { UsersWorkForCompaniesController } from '@api/usersWorkForCompanies/usersWorkForCompanies.controller';
import { UsersWorkForCompaniesRepository } from '@api/usersWorkForCompanies/usersWorkForCompanies.repository';
import { UsersWorkForCompaniesService } from '@api/usersWorkForCompanies/usersWorkForCompanies.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsersWorkForCompaniesRepository]), AuthModule],
  controllers: [UsersWorkForCompaniesController],
  providers: [UsersWorkForCompaniesService],
})
export class UsersWorkForCompaniesModule {}
