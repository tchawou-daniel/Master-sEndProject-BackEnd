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
exports.UsersWorkForCompaniesController = void 0;
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const company_service_1 = require("../company/company.service");
const create_usersWorkForCompanies_dto_1 = require("./dto/create-usersWorkForCompanies.dto");
const get_usersWorkForComponaies_filter_dto_1 = require("./dto/get-usersWorkForComponaies-filter.dto");
const update_usersWorkForCompanies_dto_1 = require("./dto/update-usersWorkForCompanies.dto");
const usersWorkForCompanies_service_1 = require("./usersWorkForCompanies.service");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let UsersWorkForCompaniesController = class UsersWorkForCompaniesController {
    constructor(usersWorkForCompaniesService, companyService) {
        this.usersWorkForCompaniesService = usersWorkForCompaniesService;
        this.companyService = companyService;
        this.logger = new common_1.Logger('UsersWorkForCompaniesController');
    }
    getUsersWorkForCompanies(filterDto, user) {
        this.logger.verbose(`"User ${user.firstName}" retrieving all users work for companies Filters: ${JSON.stringify(filterDto)}`);
        return this.usersWorkForCompaniesService.getUsersWorkForCompanies(filterDto, user);
    }
    getUserWorkForCompaniesById(id, user) {
        return this.usersWorkForCompaniesService.getUserWorkForCompaniesById(id, user);
    }
    getUsersWorkForMyCompany(filterDto, user, id) {
        const userWorkForCompanies = this.getUserWorkForCompaniesById(id, user);
        this.logger.verbose(`the content of userWorkForCompanies is: ${userWorkForCompanies}`);
        return this.getUsersWorkForCompanies(filterDto, user);
    }
    createUsersWorkForCompany(createUsersWorkForCompaniesDto, user) {
        return this.usersWorkForCompaniesService.createUsersWorkForCompany(createUsersWorkForCompaniesDto, user);
    }
    updateUsersWorkForCompany(updateEmploymentPeriodDto, user, id) {
        this.logger.verbose({ updateEmploymentPeriodDto });
        return this.usersWorkForCompaniesService.updateUsersWorkForCompaniesService(id, updateEmploymentPeriodDto, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_usersWorkForComponaies_filter_dto_1.GetUsersWorkForComponiesFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersWorkForCompaniesController.prototype, "getUsersWorkForCompanies", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersWorkForCompaniesController.prototype, "getUserWorkForCompaniesById", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_usersWorkForComponaies_filter_dto_1.GetUsersWorkForComponiesFilterDto,
        user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], UsersWorkForCompaniesController.prototype, "getUsersWorkForMyCompany", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usersWorkForCompanies_dto_1.CreateUsersWorkForCompaniesDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersWorkForCompaniesController.prototype, "createUsersWorkForCompany", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_usersWorkForCompanies_dto_1.UpdateUsersWorkForCompaniesDto,
        user_entity_1.User, String]),
    __metadata("design:returntype", Promise)
], UsersWorkForCompaniesController.prototype, "updateUsersWorkForCompany", null);
UsersWorkForCompaniesController = __decorate([
    (0, common_1.Controller)('api/v0/usersWorkForCompanies'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [usersWorkForCompanies_service_1.UsersWorkForCompaniesService,
        company_service_1.CompanyService])
], UsersWorkForCompaniesController);
exports.UsersWorkForCompaniesController = UsersWorkForCompaniesController;
//# sourceMappingURL=usersWorkForCompanies.controller.js.map