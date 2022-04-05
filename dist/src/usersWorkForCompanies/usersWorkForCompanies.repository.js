"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersWorkForCompaniesRepository = void 0;
const usersWorkForCompanies_entity_1 = require("./usersWorkForCompanies.entity");
const typeorm_1 = require("typeorm");
let UsersWorkForCompaniesRepository = class UsersWorkForCompaniesRepository extends typeorm_1.Repository {
    async getUsersWorkForCompanies(filterDto, company) {
        const { hiringStatus, search } = filterDto;
        const query = this.createQueryBuilder('user');
        query.where({ company });
        if (hiringStatus) {
            query.andWhere('company.hiringStatus = :hiringStatus', { hiringStatus });
        }
        if (search) {
            query.andWhere('(LOWER(company.name) LIKE LOWER(:search) OR LOWER(company.description) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        const usersWorkForCompanies = await query.getMany();
        return usersWorkForCompanies;
    }
};
UsersWorkForCompaniesRepository = __decorate([
    (0, typeorm_1.EntityRepository)(usersWorkForCompanies_entity_1.UsersWorkForCompanies)
], UsersWorkForCompaniesRepository);
exports.UsersWorkForCompaniesRepository = UsersWorkForCompaniesRepository;
//# sourceMappingURL=usersWorkForCompanies.repository.js.map