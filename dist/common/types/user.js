"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sex = exports.WorkerIntegrationStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["TEMPORARY_WORKER"] = "TEMPORARY_WORKER";
    UserRole["PERMANENT_WORKER"] = "PERMANENT_WORKER";
    UserRole["EMPLOYMENT_AGENCY"] = "EMPLOYMENT_AGENCY";
    UserRole["PARTNER_COMPANY_EMPLOYEE"] = "PARTNER_COMPANY_EMPLOYEE";
    UserRole["PARTNER_COMPANY_EMPLOYEE_ADMIN"] = "PARTNER_COMPANY_EMPLOYEE_ADMIN";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var WorkerIntegrationStatus;
(function (WorkerIntegrationStatus) {
    WorkerIntegrationStatus["NO_STATUS"] = "NO_STATUS";
    WorkerIntegrationStatus["ACTIF"] = "ACTIF";
    WorkerIntegrationStatus["INACTIF"] = "INACTIF";
    WorkerIntegrationStatus["POTENTIAL"] = "POTENTIAL";
})(WorkerIntegrationStatus = exports.WorkerIntegrationStatus || (exports.WorkerIntegrationStatus = {}));
var Sex;
(function (Sex) {
    Sex[Sex["MALE"] = 0] = "MALE";
    Sex[Sex["FEMALE"] = 1] = "FEMALE";
})(Sex = exports.Sex || (exports.Sex = {}));
//# sourceMappingURL=user.js.map