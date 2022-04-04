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
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const employment_service_1 = require("./employment.service");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const create_employment_dto_1 = require("./dto/create-employment.dto");
const get_employments_filter_dto_1 = require("./dto/get-employments-filter.dto");
let EmploymentController = class EmploymentController {
    constructor(employmentService) {
        this.employmentService = employmentService;
        this.logger = new common_1.Logger('EmploymentController');
    }
    getEmployment(filterDto, user) {
        this.logger.verbose(`"User ${user.firstName}" retrieving all employments Filters: ${JSON.stringify(filterDto)}`);
        return this.employmentService.getEmployments(filterDto, user);
    }
    createEmployment(createEmploymentDto, user) {
        return this.employmentService.createEmployment(createEmploymentDto, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_employments_filter_dto_1.GetEmploymentsFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", void 0)
], EmploymentController.prototype, "getEmployment", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employment_dto_1.CreateEmploymentDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmploymentController.prototype, "createEmployment", null);
EmploymentController = __decorate([
    (0, common_1.Controller)('employment'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [employment_service_1.EmploymentService])
], EmploymentController);
exports.EmploymentController = EmploymentController;
//# sourceMappingURL=employment.controller.js.map