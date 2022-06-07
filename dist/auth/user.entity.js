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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../../common/user");
const base_entity_1 = require("../shared/entities/base.entity");
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
    __metadata("design:type", typeof (_a = typeof user_1.UserRole !== "undefined" && user_1.UserRole) === "function" ? _a : Object)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_1.WorkerIntegrationStatus,
        default: user_1.WorkerIntegrationStatus.NO_STATUS,
    }),
    __metadata("design:type", typeof (_b = typeof user_1.WorkerIntegrationStatus !== "undefined" && user_1.WorkerIntegrationStatus) === "function" ? _b : Object)
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
], User.prototype, "joinAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: null, nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "lastConnection", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map