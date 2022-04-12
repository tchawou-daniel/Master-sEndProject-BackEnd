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
exports.UsersWorkForCompanies = void 0;
const user_entity_1 = require("../auth/user.entity");
const company_entity_1 = require("../company/company.entity");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../SHARED/entities/base.entity");
let UsersWorkForCompanies = class UsersWorkForCompanies extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UsersWorkForCompanies.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UsersWorkForCompanies.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UsersWorkForCompanies.prototype, "scoreCompany", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersWorkForCompanies.prototype, "companyReviews", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersWorkForCompanies.prototype, "workerReviews", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.usersWorkForCompanies),
    __metadata("design:type", user_entity_1.User)
], UsersWorkForCompanies.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (category) => category.usersWorkForCompanies),
    __metadata("design:type", company_entity_1.Company)
], UsersWorkForCompanies.prototype, "company", void 0);
UsersWorkForCompanies = __decorate([
    (0, typeorm_1.Entity)()
], UsersWorkForCompanies);
exports.UsersWorkForCompanies = UsersWorkForCompanies;
//# sourceMappingURL=usersWorkForCompanies.entity.js.map