import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "@api/auth/auth.module";
import {UsersWorkForCompaniesController} from "@api/usersWorkForCompanies/usersWorkForCompanies.controller";
import {UsersWorkForCompaniesService} from "@api/usersWorkForCompanies/usersWorkForCompanies.service";
import {UsersWorkForCompaniesRepository} from "@api/usersWorkForCompanies/usersWorkForCompanies.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UsersWorkForCompaniesRepository]), AuthModule],
    controllers: [UsersWorkForCompaniesController],
    providers: [UsersWorkForCompaniesService]
})
export class UsersWorkForCompaniesModule {}
