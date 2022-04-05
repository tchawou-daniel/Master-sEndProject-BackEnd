export enum UserRole {
    ADMIN = 'ADMIN',
    TEMPORARY_WORKER = 'TEMPORARY_WORKER',
    PERMANENT_WORKER = 'PERMANENT_WORKER',
    EMPLOYMENT_AGENCY = 'EMPLOYMENT_AGENCY',
    PARTNER_COMPANY_EMPLOYEE = 'PARTNER_COMPANY_EMPLOYEE',
    PARTNER_COMPANY_EMPLOYEE_ADMIN = 'PARTNER_COMPANY_EMPLOYEE_ADMIN'
}

/* if the user is already assigned to a company or not */
export enum WorkerIntegrationStatus {
    NO_STATUS = 'NO_STATUS',
    ACTIF = 'ACTIF',
    INACTIF = 'INACTIF',
    POTENTIAL = 'POTENTIAL',
}

export enum Sex {
    MALE,
    FEMALE,
}
