import { AuthModule } from '@api/auth/auth.module';
import { CompanyModule } from '@api/company/company.module';
import { EmploymentRepository } from '@api/employment/employment.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmploymentController } from './employment.controller';
import { EmploymentService } from './employment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmploymentRepository]),
    AuthModule,
    CompanyModule,
  ],
  controllers: [EmploymentController],
  providers: [EmploymentService],
})
export class EmploymentModule {}
