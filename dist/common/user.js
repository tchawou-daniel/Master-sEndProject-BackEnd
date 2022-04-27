"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerIntegrationStatus = exports.UserRole = void 0;
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
//# sourceMappingURL=user.js.map