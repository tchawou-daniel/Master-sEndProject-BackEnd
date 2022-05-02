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
const abilities_decorator_1 = require("../ability/abilities.decorator");
const ability_factory_1 = require("../ability/ability.factory");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const company_service_1 = require("./company.service");
const create_company_dto_1 = require("./dto/create-company.dto");
const get_companies_filter_dto_1 = require("./dto/get-companies-filter.dto");
const update_company_hiring_status_dto_1 = require("./dto/update-company-hiring-status.dto");
const update_company_dto_1 = require("./dto/update-company.dto");
const usersWorkForCompanies_service_1 = require("../usersWorkForCompanies/usersWorkForCompanies.service");
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let CompanyController = class CompanyController {
    constructor(companyService, abilityFactory, usersWorkForCompaniesService) {
        this.companyService = companyService;
        this.abilityFactory = abilityFactory;
        this.usersWorkForCompaniesService = usersWorkForCompaniesService;
        this.logger = new common_1.Logger('CompanyController');
    }
    getCompanies(filterDto, user) {
        const ability = this.abilityFactory.defineAbility(user);
        try {
            ability_1.ForbiddenError.from(ability).throwUnlessCan(ability_factory_1.Action.Read_All, user_entity_1.User);
            return this.companyService.getCompanies(filterDto);
        }
        catch (error) {
            if (error instanceof ability_1.ForbiddenError) {
                throw new common_1.ForbiddenException(error.message);
            }
        }
    }
    async getMyOwnedCompanies(filterDto, user) {
        const usersWorkForCompaniesForAnUser = await this.usersWorkForCompaniesService.getUsersWorkForCompanies(user);
        if (usersWorkForCompaniesForAnUser.length === 0) {
            return [];
        }
        const companies = await this.companyService.getCompanies(filterDto);
        const res = companies.filter((currentUsersCompany) => {
            return usersWorkForCompaniesForAnUser.find((uwfc) => {
                return uwfc.companyId === currentUsersCompany.id;
            });
        });
        this.logger.verbose(`"User ${user.firstName}" retrieving all company Filters: ${JSON.stringify(res)}`);
        return res;
    }
    getAllCompanyCreatedByTheCurrentUser(filterDto, user) {
        return this.companyService.getCompanies(filterDto, user);
    }
    getCompanyById(id, user) {
        this.logger.verbose(`user: ${JSON.stringify(user)}`);
        const ability = this.abilityFactory.defineAbility(user);
        try {
            ability_1.ForbiddenError.from(ability).throwUnlessCan(ability_factory_1.Action.Read, user_entity_1.User);
            return this.companyService.getCompanyById(id, user);
        }
        catch (error) {
            if (error instanceof ability_1.ForbiddenError) {
                throw new common_1.ForbiddenException(error.message);
            }
        }
    }
    getCompaniesCreatedByASpecificUser(id, user) {
        const ability = this.abilityFactory.defineAbility(user);
        try {
            ability_1.ForbiddenError.from(ability).throwUnlessCan(ability_factory_1.Action.Read_All_CreatedBy_SpecificUser, user_entity_1.User);
            return this.companyService.getCompanyCreatedByASpecificUser(id);
        }
        catch (error) {
            if (error instanceof ability_1.ForbiddenError) {
                throw new common_1.ForbiddenException(error.message);
            }
        }
    }
    createCompany(createCompanyDto, user) {
        const ability = this.abilityFactory.defineAbility(user);
        try {
            ability_1.ForbiddenError.from(ability).throwUnlessCan(ability_factory_1.Action.Create, user_entity_1.User);
            return this.companyService.createCompany(createCompanyDto, user);
        }
        catch (error) {
            if (error instanceof ability_1.ForbiddenError) {
                throw new common_1.ForbiddenException(error.message);
            }
        }
    }
    updateCompany(id, user, updateCompanyDto) {
        const ability = this.abilityFactory.defineAbility(user);
        try {
            ability_1.ForbiddenError.from(ability).throwUnlessCan(ability_factory_1.Action.Create, user_entity_1.User);
            return this.companyService.updateCompany(id, updateCompanyDto, user);
        }
        catch (error) {
            if (error instanceof ability_1.ForbiddenError) {
                throw new common_1.ForbiddenException(error.message);
            }
        }
    }
    updateCompanyHiringStatus(id, user, updateCompanyHiringStatusDto) {
        const ability = this.abilityFactory.defineAbility(user);
        try {
            ability_1.ForbiddenError.from(ability).throwUnlessCan(ability_factory_1.Action.Create, user_entity_1.User);
            const { hiringStatus } = updateCompanyHiringStatusDto;
            return this.companyService.updateCompanyHiringStatus(id, hiringStatus, user);
        }
        catch (error) {
            if (error instanceof ability_1.ForbiddenError) {
                throw new common_1.ForbiddenException(error.message);
            }
        }
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, abilities_decorator_1.CheckAbilities)({ action: ability_factory_1.Action.Read_All, subject: user_entity_1.User }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_companies_filter_dto_1.GetCompaniesFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanies", null);
__decorate([
    (0, common_1.Get)('/current_user_works'),
    (0, abilities_decorator_1.CheckAbilities)({
        action: ability_factory_1.Action.Read,
        subject: user_entity_1.User,
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_companies_filter_dto_1.GetCompaniesFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getMyOwnedCompanies", null);
__decorate([
    (0, common_1.Get)('/createdbycurrent_user/'),
    (0, abilities_decorator_1.CheckAbilities)({ action: ability_factory_1.Action.Read, subject: user_entity_1.User }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_companies_filter_dto_1.GetCompaniesFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], CompanyController.prototype, "getAllCompanyCreatedByTheCurrentUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, abilities_decorator_1.CheckAbilities)({ action: ability_factory_1.Action.Read, subject: user_entity_1.User }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanyById", null);
__decorate([
    (0, common_1.Get)('/createdby_specific_user/:id'),
    (0, abilities_decorator_1.CheckAbilities)({
        action: ability_factory_1.Action.Read_All_CreatedBy_SpecificUser,
        subject: user_entity_1.User,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompaniesCreatedByASpecificUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, abilities_decorator_1.CheckAbilities)({ action: ability_factory_1.Action.Create, subject: user_entity_1.User }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createCompany", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, abilities_decorator_1.CheckAbilities)({ action: ability_factory_1.Action.Update, subject: user_entity_1.User }),
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
    (0, abilities_decorator_1.CheckAbilities)({ action: ability_factory_1.Action.Update, subject: user_entity_1.User }),
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
    __metadata("design:paramtypes", [company_service_1.CompanyService,
        ability_factory_1.AbilityFactory,
        usersWorkForCompanies_service_1.UsersWorkForCompaniesService])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map