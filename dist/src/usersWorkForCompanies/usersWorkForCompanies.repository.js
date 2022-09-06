"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersWorkForCompaniesRepository = void 0;
const usersWorkForCompanies_entity_1 = require("./usersWorkForCompanies.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let UsersWorkForCompaniesRepository = class UsersWorkForCompaniesRepository extends typeorm_1.Repository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('UsersWorkForCompaniesRepository');
    }
    async getUsersWorkForCompanies(filterDto, user) {
        const { scoreCompany, companyReviews, workerReviews } = filterDto || {};
        this.logger.verbose({ user });
        const query = this.createQueryBuilder('usersWorkForCompanies');
        query.where({ user });
        if (scoreCompany) {
            query.andWhere('usersWorkForCompanies.scoreCompany = :scoreCompany', {
                scoreCompany,
            });
        }
        if (companyReviews) {
            query.andWhere('(LOWER(usersWorkForCompanies.companyReviews) LIKE LOWER(:search)', { search: `%${companyReviews}%` });
        }
        if (workerReviews) {
            query.andWhere('(LOWER(usersWorkForCompanies.workerReviews) LIKE LOWER(:search)', { search: `%${workerReviews}%` });
        }
        const usersWorkForCompanies = await query.getMany();
        this.logger.verbose({ usersWorkForCompanies });
        return usersWorkForCompanies;
    }
    async getUsersWorkForASpecificCompany(companyId) {
        const query = this.createQueryBuilder('usersWorkForCompanies');
        query.where('usersWorkForCompanies.companyId = :companyId', { companyId });
        return query.getMany();
    }
    async createUsersWorkForComany(createUsersWorkForCompanies, user) {
        const { scoreCompany, companyReviews, workerReviews, companyId, userId } = createUsersWorkForCompanies;
        const usersWorkForCompanies = this.create({
            scoreCompany,
            companyReviews,
            workerReviews,
            userId,
            companyId,
        });
        await this.save(usersWorkForCompanies);
        return usersWorkForCompanies;
    }
    async getUserWorkForCompanyByIds(companyId, userId) {
        const query = this.createQueryBuilder('usersWorkForCompanies');
        query.where('usersWorkForCompanies.companyId = :companyId', { companyId });
        query.andWhere('usersWorkForCompanies.userId = :userId', {
            userId,
        });
        const result = await query.getOne();
        common_1.Logger.log(result);
        return result;
    }
    async deleteAUserCompany(userId, companyId, user) {
        const query = this.createQueryBuilder('usersWorkForCompanies');
        await this.createQueryBuilder()
            .delete()
            .from(usersWorkForCompanies_entity_1.UsersWorkForCompanies)
            .where('usersWorkForCompanies.userId = :userId', {
            userId,
        })
            .andWhere('usersWorkForCompanies.companyId = :companyId', {
            companyId,
        })
            .execute();
    }
};
UsersWorkForCompaniesRepository = __decorate([
    (0, typeorm_1.EntityRepository)(usersWorkForCompanies_entity_1.UsersWorkForCompanies)
], UsersWorkForCompaniesRepository);
exports.UsersWorkForCompaniesRepository = UsersWorkForCompaniesRepository;
//# sourceMappingURL=usersWorkForCompanies.repository.js.map