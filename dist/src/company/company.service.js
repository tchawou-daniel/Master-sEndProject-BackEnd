"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const user_entity_1 = require("../auth/user.entity");
const company_repository_1 = require("./company.repository");
const create_company_dto_1 = require("./dto/create-company.dto");
const get_companies_filter_dto_1 = require("./dto/get-companies-filter.dto");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const user_1 = require("../../common/types/user");
let CompanyService = class CompanyService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    getCompanies(filterDto, user) {
        if (user) {
            return this.companyRepository.getCompanies(filterDto, user);
        }
        return this.companyRepository.getCompanies(filterDto);
    }
    async getCompanyById(id, user) {
        const found = await this.companyRepository.findOne({ where: { id, user } });
        if (!found) {
            throw new common_1.NotFoundException(`Company with ID "${id}" not found`);
        }
        return found;
    }
    async getCompanyByName(companyName, user) {
        if (!(0, lodash_1.isEqual)(user_1.UserRole.PERMANENT_WORKER, user.role) ||
            !(0, lodash_1.isEqual)(user_1.UserRole.TEMPORARY_WORKER, user.role)) {
            const idFound = await this.companyRepository.findOne({
                where: { companyName },
            });
            if (!idFound) {
                throw new common_1.NotFoundException(`Company id with name "${companyName}" not found`);
            }
            return idFound;
        }
        throw new common_1.NotFoundException(`ERROR 404`);
    }
    createCompany(createCompanyDto, user) {
        return this.companyRepository.createCompany(createCompanyDto, user);
    }
    async updateCompany(id, updateCompanyDto, user) {
        const company = await this.getCompanyById(id, user);
        company.name = updateCompanyDto.name;
        company.companyStatus = updateCompanyDto.companyStatus;
        company.country = updateCompanyDto.country;
        company.town = updateCompanyDto.town;
        company.street = updateCompanyDto.street;
        company.zipCode = updateCompanyDto.zipCode;
        company.description = updateCompanyDto.description;
        company.companySector = updateCompanyDto.companySector;
        company.hiringStatus = updateCompanyDto.hiringStatus;
        await this.companyRepository.save(company);
        return company;
    }
    async updateCompanyHiringStatus(id, hiringStatus, user) {
        const company = await this.getCompanyById(id, user);
        company.hiringStatus = hiringStatus;
        await this.companyRepository.save(company);
        return company;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_companies_filter_dto_1.GetCompaniesFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CompanyService.prototype, "getCompanies", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CompanyService.prototype, "createCompany", null);
CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_repository_1.CompanyRepository)),
    __metadata("design:paramtypes", [company_repository_1.CompanyRepository])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map