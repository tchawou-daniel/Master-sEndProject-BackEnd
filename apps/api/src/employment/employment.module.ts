import { Module } from '@nestjs/common';
import { EmploymentController } from './employment.controller';
import { EmploymentService } from './employment.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "@api/auth/auth.module";
import {EmploymentRepository} from "@api/employment/employment.repository";

@Module({
  imports: [TypeOrmModule.forFeature([EmploymentRepository]), AuthModule],
  controllers: [EmploymentController],
  providers: [EmploymentService]
})
export class EmploymentModule {}
