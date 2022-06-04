"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./auth/user.module");
const config_schema_1 = require("./config.schema");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const company_module_1 = require("./company/company.module");
const employment_module_1 = require("./employment/employment.module");
const employmentDays_module_1 = require("./employmentDays/employmentDays.module");
const employmentPeriod_module_1 = require("./employmentPeriods/employmentPeriod.module");
const usersWorkForCompanies_module_1 = require("./usersWorkForCompanies/usersWorkForCompanies.module");
const workerPeriods_module_1 = require("./worker-periods/workerPeriods.module");
const workerDays_module_1 = require("./workerDays/workerDays.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: [`.env.stage.${process.env.STAGE}`],
                validationSchema: config_schema_1.configValidationSchema,
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 120,
                limit: 20,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const isProduction = configService.get('STAGE') === 'prod';
                    return {
                        ssh: isProduction,
                        extra: {
                            ssl: isProduction ? { rejectUnauthorized: false } : null,
                        },
                        entities: [],
                        autoLoadEntities: true,
                        synchronize: true,
                        type: 'postgres',
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_DATABASE'),
                    };
                },
            }),
            auth_module_1.AuthModule,
            user_module_1.UsersModule,
            company_module_1.CompanyModule,
            usersWorkForCompanies_module_1.UsersWorkForCompaniesModule,
            employment_module_1.EmploymentModule,
            employmentPeriod_module_1.EmploymentPeriodModule,
            employmentDays_module_1.EmploymentDaysModule,
            workerPeriods_module_1.WorkerPeriodsModule,
            workerDays_module_1.WorkerDaysModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map