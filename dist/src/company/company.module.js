"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModule = void 0;
const ability_module_1 = require("../ability/ability.module");
const auth_module_1 = require("../auth/auth.module");
const company_repository_1 = require("./company.repository");
const usersWorkForCompanies_repository_1 = require("../usersWorkForCompanies/usersWorkForCompanies.repository");
const usersWorkForCompanies_service_1 = require("../usersWorkForCompanies/usersWorkForCompanies.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const company_controller_1 = require("./company.controller");
const company_service_1 = require("./company.service");
let CompanyModule = class CompanyModule {
};
CompanyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                company_repository_1.CompanyRepository,
                usersWorkForCompanies_repository_1.UsersWorkForCompaniesRepository,
            ]),
            auth_module_1.AuthModule,
            ability_module_1.AbilityModule,
        ],
        controllers: [company_controller_1.CompanyController],
        providers: [company_service_1.CompanyService, usersWorkForCompanies_service_1.UsersWorkForCompaniesService],
        exports: [company_service_1.CompanyService],
    })
], CompanyModule);
exports.CompanyModule = CompanyModule;
//# sourceMappingURL=company.module.js.map