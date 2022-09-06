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
exports.Company = void 0;
const user_entity_1 = require("../auth/user.entity");
const employment_entity_1 = require("../employment/employment.entity");
const base_entity_1 = require("../SHARED/entities/base.entity");
const usersWorkForCompanies_entity_1 = require("../usersWorkForCompanies/usersWorkForCompanies.entity");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const company_1 = require("../../common/types/company");
let Company = class Company extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: company_1.CompanyStatus,
        default: company_1.CompanyStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Company.prototype, "companyStatus", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "town", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "zipCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: company_1.CompanySector,
        default: company_1.CompanySector.EAU_DECHETS,
    }),
    __metadata("design:type", String)
], Company.prototype, "companySector", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: company_1.Hiring,
        default: company_1.Hiring.ONGOING,
    }),
    __metadata("design:type", String)
], Company.prototype, "hiringStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: null, nullable: true }),
    __metadata("design:type", Date)
], Company.prototype, "clearedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((_type) => user_entity_1.User, (user) => user.companies, {
        eager: false,
        onDelete: 'CASCADE',
    }),
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    __metadata("design:type", user_entity_1.User)
], Company.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((_type) => employment_entity_1.Employment, (employment) => employment.company, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Company.prototype, "employments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => usersWorkForCompanies_entity_1.UsersWorkForCompanies, (usersWorkForCompanies) => usersWorkForCompanies.company),
    __metadata("design:type", Array)
], Company.prototype, "usersWorkForCompanies", void 0);
Company = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)('index_name', ['name'])
], Company);
exports.Company = Company;
//# sourceMappingURL=company.entity.js.map