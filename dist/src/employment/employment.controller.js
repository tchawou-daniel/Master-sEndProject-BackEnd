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
exports.EmploymentController = void 0;
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const company_entity_1 = require("../company/company.entity");
const get_company_decorator_1 = require("../company/get-company.decorator");
const employment_dto_1 = require("./dto/employment.dto");
const get_employments_filter_dto_1 = require("./dto/get-employments-filter.dto");
const employment_service_1 = require("./employment.service");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let EmploymentController = class EmploymentController {
    constructor(employmentService) {
        this.employmentService = employmentService;
        this.logger = new common_1.Logger('EmploymentController');
    }
    getEmploymentsFromAdminUser(filterDto) {
        this.logger.verbose(`"User admin retrieving all employments Filters: ${JSON.stringify(filterDto)}`);
        return this.employmentService.getEmployments(filterDto);
    }
    getEmploymentsByCompanyIdFromAdminUser(id, filterDto, company, createdBy) {
        return this.employmentService.getEmploymentsByCompanyId(id, filterDto, createdBy, company);
    }
    getEmployments(filterDto, user) {
        this.logger.verbose(`"User ${user.firstName}" retrieving all employments Filters: ${JSON.stringify(filterDto)}`);
        return this.employmentService.getEmployments(filterDto, user);
    }
    getEmploymentsByCompanyId(id, filterDto, company, createdBy) {
        return this.employmentService.getEmploymentsByCompanyId(id, filterDto, createdBy, company);
    }
    createEmployment(createEmploymentDto, user, company) {
        return this.employmentService.createEmployment(createEmploymentDto, user, company);
    }
    deleteEmployment(id) {
        return this.employmentService.deleteEmployment(id);
    }
    updateEmploymentStatus(id, createdUser, company) {
        if (createdUser !== null) {
            return this.employmentService.updateEmploymentStatus(id, company, createdUser);
        }
    }
};
__decorate([
    (0, common_1.Get)('/admin/employments'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_employments_filter_dto_1.GetEmploymentsFilterDto]),
    __metadata("design:returntype", void 0)
], EmploymentController.prototype, "getEmploymentsFromAdminUser", null);
__decorate([
    (0, common_1.Get)('/admin/employmentByCompanyId/'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, get_company_decorator_1.GetCompany)()),
    __param(3, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_employments_filter_dto_1.GetEmploymentsFilterDto, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "getEmploymentsByCompanyIdFromAdminUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_employments_filter_dto_1.GetEmploymentsFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], EmploymentController.prototype, "getEmployments", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, get_company_decorator_1.GetCompany)()),
    __param(3, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_employments_filter_dto_1.GetEmploymentsFilterDto, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "getEmploymentsByCompanyId", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, get_company_decorator_1.GetCompany)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employment_dto_1.EmploymentDto,
        user_entity_1.User,
        company_entity_1.Company]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "createEmployment", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "deleteEmployment", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, get_company_decorator_1.GetCompany)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User,
        company_entity_1.Company]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "updateEmploymentStatus", null);
EmploymentController = __decorate([
    (0, common_1.Controller)('/api/v0/employment'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [employment_service_1.EmploymentService])
], EmploymentController);
exports.EmploymentController = EmploymentController;
//# sourceMappingURL=employment.controller.js.map