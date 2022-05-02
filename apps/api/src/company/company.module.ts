import { AbilityModule } from '@api/ability/ability.module';
import { AuthModule } from '@api/auth/auth.module';
import { User } from '@api/auth/user.entity';
import { CompanyRepository } from '@api/company/company.repository';
import { UsersWorkForCompaniesController } from '@api/usersWorkForCompanies/usersWorkForCompanies.controller';
import { UsersWorkForCompaniesModule } from '@api/usersWorkForCompanies/usersWorkForCompanies.module';
import { UsersWorkForCompaniesRepository } from '@api/usersWorkForCompanies/usersWorkForCompanies.repository';
import { UsersWorkForCompaniesService } from '@api/usersWorkForCompanies/usersWorkForCompanies.service';
import { forwardRef, Module } from '@nestjs/common';
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
