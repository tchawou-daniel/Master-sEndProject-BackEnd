import {EntityRepository, Repository} from "typeorm";
import {UsersWorkForCompanies} from "@api/usersWorkForCompanies/usersWorkForCompanies.entity";

@EntityRepository(UsersWorkForCompanies)
export class UsersWorkForCompaniesRepository extends Repository<UsersWorkForCompanies> {
}
