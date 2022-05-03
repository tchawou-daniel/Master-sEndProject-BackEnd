"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRepository = void 0;
const company_entity_1 = require("./company.entity");
const typeorm_1 = require("typeorm");
let CompanyRepository = class CompanyRepository extends typeorm_1.Repository {
    async getCompanies(filterDto, user) {
        const { hiringStatus, search } = filterDto;
        const query = this.createQueryBuilder('company');
        if (user) {
            query.where({ user });
        }
        if (hiringStatus) {
            query.andWhere('company.hiringStatus = :hiringStatus', { hiringStatus });
        }
        if (search) {
            query.andWhere('(LOWER(company.name) LIKE LOWER(:search) OR LOWER(company.description) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        const companies = await query.getMany();
        return companies;
    }
    async getCompaniesCreatedByAspecificUser(idUser) {
        const query = this.createQueryBuilder('company');
        if (idUser) {
            query.where('company.user = :user', { user: idUser });
        }
        const companies = await query.getMany();
        return companies;
    }
    async createCompany(createCompanyDto, user) {
        const { name, companyStatus, country, town, street, zipCode, description, companySector, hiringStatus, clearedAt, } = createCompanyDto;
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
};
CompanyRepository = __decorate([
    (0, typeorm_1.EntityRepository)(company_entity_1.Company)
], CompanyRepository);
exports.CompanyRepository = CompanyRepository;
//# sourceMappingURL=company.repository.js.map