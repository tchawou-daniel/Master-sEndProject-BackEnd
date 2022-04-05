"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRepository = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
const user_1 = require("../../common/types/user");
let CompanyRepository = class CompanyRepository extends typeorm_1.Repository {
    async getCompanies(filterDto, user) {
        const { hiringStatus, search } = filterDto;
        const query = this.createQueryBuilder('company');
        query.where({ user });
        query.andWhere('user.role = :userRole', { userRole: user_1.UserRole.ADMIN });
        if (hiringStatus) {
            query.andWhere('company.hiringStatus = :hiringStatus', { hiringStatus });
        }
        if (search) {
            query.andWhere('(LOWER(company.name) LIKE LOWER(:search) OR LOWER(company.description) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        const companies = await query.getMany();
        return companies;
    }
    async createCompany(createTaskDto, user) {
        if (user.role === user_1.UserRole.ADMIN || user.role === user_1.UserRole.PARTNER_COMPANY_EMPLOYEE_ADMIN) {
            const { name, companyStatus, country, town, street, zipCode, description, companySector, hiringStatus, clearedAt, } = createTaskDto;
            const company = this.create({
                name,
                companyStatus,
                country,
                town,
                street,
                zipCode,
                description,
                companySector,
                hiringStatus,
                clearedAt,
                user,
            });
            await this.save(company);
            return company;
        }
    }
};
CompanyRepository = __decorate([
    (0, typeorm_1.EntityRepository)(company_entity_1.Company)
], CompanyRepository);
exports.CompanyRepository = CompanyRepository;
//# sourceMappingURL=company.repository.js.map