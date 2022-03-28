import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "@api/auth/auth.module";
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
    imports: [TypeOrmModule.forFeature([]), AuthModule],
    controllers: [CompanyController],
    providers: [CompanyService]
})
export class CompanyModule {}
