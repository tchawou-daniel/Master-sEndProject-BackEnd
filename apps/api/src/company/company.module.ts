import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "@api/auth/auth.module";
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import {CompanyRepository} from "@api/company/company.repository";

@Module({
    imports: [TypeOrmModule.forFeature([CompanyRepository]), AuthModule],
    controllers: [CompanyController],
    providers: [CompanyService]
})
export class CompanyModule {}
