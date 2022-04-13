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
exports.EmploymentService = void 0;
const user_entity_1 = require("../auth/user.entity");
const company_entity_1 = require("../company/company.entity");
const employment_dto_1 = require("./dto/employment.dto");
const get_employments_filter_dto_1 = require("./dto/get-employments-filter.dto");
const employment_repository_1 = require("./employment.repository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let EmploymentService = class EmploymentService {
    constructor(employmentRepository) {
        this.employmentRepository = employmentRepository;
    }
    getEmployments(filterDto, user) {
        return this.employmentRepository.getEmployements(filterDto, user);
    }
    async getEmploymentById(id, company) {
        const found = await this.employmentRepository.findOne({
            where: { id, company },
        });
        if (!found) {
            throw new common_1.NotFoundException(`Employment with ID "${id}" not found`);
        }
        return this.employmentRepository.findOne(id);
    }
    createEmployment(createEmploymentDto, user) {
        return this.employmentRepository.createEmployment(createEmploymentDto, user);
    }
    async deleteEmployment(id) {
        const result = await this.employmentRepository.delete({ id });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Employment with ID "${id}" not found`);
        }
    }
    async updateEmploymentStatus(id, company) {
        const employment = await this.getEmploymentById(id, company);
        await this.employmentRepository.save(employment);
        return employment;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_employments_filter_dto_1.GetEmploymentsFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmploymentService.prototype, "getEmployments", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, company_entity_1.Company]),
    __metadata("design:returntype", Promise)
], EmploymentService.prototype, "getEmploymentById", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employment_dto_1.EmploymentDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EmploymentService.prototype, "createEmployment", null);
EmploymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employment_repository_1.EmploymentRepository)),
    __metadata("design:paramtypes", [employment_repository_1.EmploymentRepository])
], EmploymentService);
exports.EmploymentService = EmploymentService;
//# sourceMappingURL=employment.service.js.map