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
const lodash_1 = require("lodash");
const typeorm_1 = require("typeorm");
const user_1 = require("../../common/types/user");
let UsersWorkForCompaniesRepository = class UsersWorkForCompaniesRepository extends typeorm_1.Repository {
    async getMyOwnCompanies(filterDto, user) {
        const query = this.createQueryBuilder('usersWorkForCompanies');
        query.where({ user });
        return query.getMany();
    }
    async getWorkerOfMyCompany(filterDto, company, user) {
        if ((0, lodash_1.isEqual)(user.role, user_1.UserRole.PARTNER_COMPANY_EMPLOYEE_ADMIN) ||
            (0, lodash_1.isEqual)(user.role, user_1.UserRole.PARTNER_COMPANY_EMPLOYEE)) {
            const query = this.createQueryBuilder('usersWorkForCompanies');
            const userId = user.id;
            query.where('usersWorkForCompanies.user = :userId', { userId });
            query.andWhere({ user });
            return query.getMany();
        }
    }
};
UsersWorkForCompaniesRepository = __decorate([
    (0, typeorm_1.EntityRepository)(usersWorkForCompanies_entity_1.UsersWorkForCompanies)
], UsersWorkForCompaniesRepository);
exports.UsersWorkForCompaniesRepository = UsersWorkForCompaniesRepository;
//# sourceMappingURL=usersWorkForCompanies.repository.js.map