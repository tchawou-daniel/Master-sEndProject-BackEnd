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
exports.User = void 0;
const company_entity_1 = require("../company/company.entity");
const employment_entity_1 = require("../employment/employment.entity");
const employmentDays_entity_1 = require("../employmentDays/employmentDays.entity");
const base_entity_1 = require("../SHARED/entities/base.entity");
const usersWorkForCompanies_entity_1 = require("../usersWorkForCompanies/usersWorkForCompanies.entity");
const workerPeriods_entity_1 = require("../worker-periods/workerPeriods.entity");
const typeorm_1 = require("typeorm");
const user_1 = require("../../common/types/user");
const class_transformer_1 = require("class-transformer");
let User = class User extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_1.UserRole,
        default: user_1.UserRole.EMPLOYMENT_AGENCY,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_1.WorkerIntegrationStatus,
        default: user_1.WorkerIntegrationStatus.NO_STATUS,
    }),
    __metadata("design:type", String)
], User.prototype, "workerIntegrationStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: null, nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "clearedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: null, nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "joinedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: null, nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastConnection", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], User.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => company_entity_1.Company, (company) => company.user, { eager: true }),
    __metadata("design:type", Array)
], User.prototype, "companies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => employmentDays_entity_1.EmploymentDays, (employmentDays) => employmentDays.user, { eager: true }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", Array)
], User.prototype, "employmentDays", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => employment_entity_1.Employment, (employment) => employment.createdBy, {
        eager: true,
    }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", Array)
], User.prototype, "employments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => workerPeriods_entity_1.WorkerPeriods, (workerPeriods) => workerPeriods.user, {
        eager: true,
    }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", Array)
], User.prototype, "workerPeriods", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => usersWorkForCompanies_entity_1.UsersWorkForCompanies, (usersWorkForCompanies) => usersWorkForCompanies.user),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", Array)
], User.prototype, "usersWorkForCompanies", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map