"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmploymentRepository = void 0;
const employment_entity_1 = require("./employment.entity");
const typeorm_1 = require("typeorm");
let EmploymentRepository = class EmploymentRepository extends typeorm_1.Repository {
    async getEmployments(filterDto, company, createdBy) {
        const { hiringStatus, search } = filterDto;
        const query = this.createQueryBuilder('employment');
        if (createdBy) {
            query.andWhere({ createdBy });
        }
        if (company) {
            query.andWhere({ company });
        }
        if (hiringStatus) {
            query.andWhere('employment.hiringStatus = :hiringStatus', {
                hiringStatus,
            });
        }
        if (search) {
            query.andWhere('(LOWER(employment.name) LIKE LOWER(:search) OR LOWER(employment.description) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        const employments = await query.getMany();
        return employments;
    }
    async createEmployment(createEmploymentDto, createdBy) {
        const { name, description, country, town, street, zipCode, employmentSector, hiringStatus, clearedAt, updatedAt, createdAt, hasManySubsidiaries, company, } = createEmploymentDto;
        const employment = this.create({
            name,
            description,
            country,
            town,
            street,
            zipCode,
            employmentSector,
            hiringStatus,
            clearedAt,
            updatedAt,
            createdAt,
            hasManySubsidiaries,
            createdBy,
            company,
        });
        await this.save(employment);
        return employment;
    }
};
EmploymentRepository = __decorate([
    (0, typeorm_1.EntityRepository)(employment_entity_1.Employment)
], EmploymentRepository);
exports.EmploymentRepository = EmploymentRepository;
//# sourceMappingURL=employment.repository.js.map