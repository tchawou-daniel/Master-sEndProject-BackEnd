import {Injectable} from "@nestjs/common";
import {UsersWorkForCompaniesRepository} from "@api/usersWorkForCompanies/usersWorkForCompanies.repository";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersWorkForCompaniesService {
    constructor(
        @InjectRepository(UsersWorkForCompaniesRepository)
        private usersWorkForCompaniesRepository: UsersWorkForCompaniesRepository,
    ) {
    }
}
