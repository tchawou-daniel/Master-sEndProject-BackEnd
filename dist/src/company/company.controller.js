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
exports.CompanyController = void 0;
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const company_service_1 = require("./company.service");
const create_company_dto_1 = require("./dto/create-company.dto");
const get_companies_filter_dto_1 = require("./dto/get-companies-filter.dto");
const update_company_hiring_status_dto_1 = require("./dto/update-company-hiring-status.dto");
const update_company_dto_1 = require("./dto/update-company.dto");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
        this.logger = new common_1.Logger('CompanyController');
    }
    getMyOwnedCompanies(filterDto, user) {
        this.logger.verbose(`"User ${user.firstName}" retrieving all company Filters: ${JSON.stringify(filterDto)}`);
        return this.companyService.getCompanies(filterDto, user);
    }
    getCompanies(filterDto) {
        return this.companyService.getCompanies(filterDto);
    }
    getCompanyById(id, user) {
        return this.companyService.getCompanyById(id, user);
    }
    createCompany(createCompanyDto, user) {
        return this.companyService.createCompany(createCompanyDto, user);
    }
    updateCompany(id, user, updateCompanyDto) {
        return this.companyService.updateCompany(id, updateCompanyDto, user);
    }
    updateCompanyHiringStatus(id, user, updateCompanyHiringStatusDto) {
        const { hiringStatus } = updateCompanyHiringStatusDto;
        return this.companyService.updateCompanyHiringStatus(id, hiringStatus, user);
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_companies_filter_dto_1.GetCompaniesFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getMyOwnedCompanies", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_companies_filter_dto_1.GetCompaniesFilterDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanies", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanyById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createCompany", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User,
        update_company_dto_1.UpdateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "updateCompany", null);
__decorate([
    (0, common_1.Patch)('/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User,
        update_company_hiring_status_dto_1.UpdateCompanyHiringStatusDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "updateCompanyHiringStatus", null);
CompanyController = __decorate([
    (0, common_1.Controller)('/api/v0/company'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map