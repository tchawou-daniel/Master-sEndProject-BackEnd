"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersWorkForCompaniesModule = void 0;
const auth_module_1 = require("../auth/auth.module");
const company_module_1 = require("../company/company.module");
const usersWorkForCompanies_controller_1 = require("./usersWorkForCompanies.controller");
const usersWorkForCompanies_repository_1 = require("./usersWorkForCompanies.repository");
const usersWorkForCompanies_service_1 = require("./usersWorkForCompanies.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let UsersWorkForCompaniesModule = class UsersWorkForCompaniesModule {
};
UsersWorkForCompaniesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([usersWorkForCompanies_repository_1.UsersWorkForCompaniesRepository]),
            auth_module_1.AuthModule,
            company_module_1.CompanyModule,
        ],
        controllers: [usersWorkForCompanies_controller_1.UsersWorkForCompaniesController],
        providers: [usersWorkForCompanies_service_1.UsersWorkForCompaniesService],
        exports: [usersWorkForCompanies_service_1.UsersWorkForCompaniesService],
    })
], UsersWorkForCompaniesModule);
exports.UsersWorkForCompaniesModule = UsersWorkForCompaniesModule;
//# sourceMappingURL=usersWorkForCompanies.module.js.map