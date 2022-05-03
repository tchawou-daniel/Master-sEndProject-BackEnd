import { AbilityModule } from '@api/ability/ability.module';
import { AuthModule } from '@api/auth/auth.module';
import { CompanyRepository } from '@api/company/company.repository';
import { UsersWorkForCompaniesRepository } from '@api/usersWorkForCompanies/usersWorkForCompanies.repository';
import { UsersWorkForCompaniesService } from '@api/usersWorkForCompanies/usersWorkForCompanies.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyRepository,
      UsersWorkForCompaniesRepository,
    ]),
    AuthModule,
    AbilityModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService, UsersWorkForCompaniesService],
  exports: [CompanyService],
})
export class CompanyModule {}
