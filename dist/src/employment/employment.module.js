"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmploymentModule = void 0;
const auth_module_1 = require("../auth/auth.module");
const company_module_1 = require("../company/company.module");
const employment_repository_1 = require("./employment.repository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const employment_controller_1 = require("./employment.controller");
const employment_service_1 = require("./employment.service");
let EmploymentModule = class EmploymentModule {
};
EmploymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([employment_repository_1.EmploymentRepository]),
            auth_module_1.AuthModule,
            company_module_1.CompanyModule,
        ],
        controllers: [employment_controller_1.EmploymentController],
        providers: [employment_service_1.EmploymentService],
    })
], EmploymentModule);
exports.EmploymentModule = EmploymentModule;
//# sourceMappingURL=employment.module.js.map