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
const get_company_decorator_1 = require("../company/get-company.decorator");
const create_employment_dto_1 = require("./dto/create-employment.dto");
const get_employments_filter_dto_1 = require("./dto/get-employments-filter.dto");
const update_employment_status_dto_1 = require("./dto/update-employment-status.dto");
const update_employment_dto_1 = require("./dto/update-employment.dto");
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
    getEmploymentsByCompanyIdFromAdminUser(id, filterDto, company) {
        return this.employmentService.getEmploymentsByCompanyId(id, filterDto, company);
    }
    getEmployments(filterDto, user) {
        this.logger.verbose(`"User ${user.firstName}" retrieving all employments Filters: ${JSON.stringify(filterDto)}`);
        return this.employmentService.getEmployments(filterDto, user);
    }
    getEmploymentsById(id, filterDto, company, createdBy) {
        return this.employmentService.getEmploymentsByCompanyId(id, filterDto, company, createdBy);
    }
    getEmploymentsByCompanyId(id, filterDto, company, createdBy) {
        return this.employmentService.getEmploymentsByCompanyId(id, filterDto, company, createdBy);
    }
    createEmployment(createEmploymentDto, user) {
        return this.employmentService.createEmployment(createEmploymentDto, user);
    }
    updateEmploymentStatus(id, updateEmploymentStatusDto) {
        return this.employmentService.updateEmploymentStatus(id, updateEmploymentStatusDto);
    }
    updateEmployment(id, updateEmploymentDto) {
        return this.employmentService.updateEmployment(id, updateEmploymentDto);
    }
    deleteEmployment(id) {
        return this.employmentService.deleteEmployment(id);
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
    (0, common_1.Get)('/admin/employment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, get_company_decorator_1.GetCompany)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_employments_filter_dto_1.GetEmploymentsFilterDto, Object]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "getEmploymentsByCompanyIdFromAdminUser", null);
__decorate([
    (0, common_1.Get)('/employment'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_employments_filter_dto_1.GetEmploymentsFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], EmploymentController.prototype, "getEmployments", null);
__decorate([
    (0, common_1.Get)('/employment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, get_company_decorator_1.GetCompany)()),
    __param(3, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_employments_filter_dto_1.GetEmploymentsFilterDto, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "getEmploymentsById", null);
__decorate([
    (0, common_1.Get)('/employment'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, get_company_decorator_1.GetCompany)()),
    __param(3, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_employments_filter_dto_1.GetEmploymentsFilterDto, Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "getEmploymentsByCompanyId", null);
__decorate([
    (0, common_1.Post)('/employment'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employment_dto_1.CreateEmploymentDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "createEmployment", null);
__decorate([
    (0, common_1.Patch)('/employment/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_employment_status_dto_1.UpdateEmploymentStatusDto]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "updateEmploymentStatus", null);
__decorate([
    (0, common_1.Patch)('/employment/'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_employment_dto_1.UpdateEmploymentDto]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "updateEmployment", null);
__decorate([
    (0, common_1.Delete)('/employment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "deleteEmployment", null);
EmploymentController = __decorate([
    (0, common_1.Controller)('/api/v0'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [employment_service_1.EmploymentService])
], EmploymentController);
exports.EmploymentController = EmploymentController;
//# sourceMappingURL=employment.controller.js.map