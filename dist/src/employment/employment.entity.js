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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employment = void 0;
const user_entity_1 = require("../auth/user.entity");
const company_entity_1 = require("../company/company.entity");
const employmentPeriods_entity_1 = require("../employmentPeriods/employmentPeriods.entity");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const employment_1 = require("../../common/types/employment");
const base_entity_1 = require("../SHARED/entities/base.entity");
let Employment = class Employment extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employment.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employment.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employment.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employment.prototype, "town", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employment.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employment.prototype, "zipCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: employment_1.Hiring,
        default: employment_1.Hiring.ONGOING,
    }),
    __metadata("design:type", String)
], Employment.prototype, "hiringStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: null, nullable: true }),
    __metadata("design:type", Date)
], Employment.prototype, "clearedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: null, nullable: true }),
    __metadata("design:type", Date)
], Employment.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Employment.prototype, "hasManySubsidiaries", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Employment.prototype, "employmentSector", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_type) => company_entity_1.Company, (company) => company.employments, {
        eager: false,
    }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", company_entity_1.Company)
], Employment.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => employmentPeriods_entity_1.EmploymentPeriods, (employmentPeriods) => employmentPeriods.employment, { eager: true }),
    __metadata("design:type", Array)
], Employment.prototype, "employmentPeriods", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_type) => user_entity_1.User, (user) => user.employments, { eager: false }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", user_entity_1.User)
], Employment.prototype, "createdBy", void 0);
Employment = __decorate([
    (0, typeorm_1.Entity)()
], Employment);
exports.Employment = Employment;
//# sourceMappingURL=employment.entity.js.map