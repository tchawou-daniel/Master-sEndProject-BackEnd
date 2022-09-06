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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersWorkForCompaniesService = void 0;
const user_entity_1 = require("../auth/user.entity");
const get_usersWorkForComponaies_filter_dto_1 = require("./dto/get-usersWorkForComponaies-filter.dto");
const usersWorkForCompanies_repository_1 = require("./usersWorkForCompanies.repository");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let UsersWorkForCompaniesService = class UsersWorkForCompaniesService {
    constructor(usersWorkForCompaniesRepository) {
        this.usersWorkForCompaniesRepository = usersWorkForCompaniesRepository;
        this.logger = new common_1.Logger('UsersWorkForCompaniesService');
    }
    getUsersWorkForCompanies(user, filterDto) {
        return this.usersWorkForCompaniesRepository.getUsersWorkForCompanies(filterDto, user);
    }
    async getUsersWorkForASpecificCompany(companyId) {
        const found = await this.usersWorkForCompaniesRepository.getUsersWorkForASpecificCompany(companyId);
        if (!found) {
            throw new common_1.NotFoundException(`User work for company with ID "${companyId}" not found`);
        }
        return found;
    }
    async getASpecificUserWorkForCompany(companyId, userId) {
        const found = await this.usersWorkForCompaniesRepository.getUserWorkForCompanyByIds(companyId, userId);
        return found;
    }
    async getUserWorkForCompaniesById(id, user) {
        const found = await this.usersWorkForCompaniesRepository.findOne({
            id,
            user,
        });
        if (!found) {
            throw new common_1.NotFoundException(`User work for company with ID "${id}" not found`);
        }
        return found;
    }
    createUsersWorkForCompany(createUsersWorkForCompaniesDto, user) {
        return this.usersWorkForCompaniesRepository.createUsersWorkForComany(createUsersWorkForCompaniesDto, user);
    }
    async updateUsersWorkForCompaniesService(id, updateUsersWorkForCompaniesDto, user) {
        const usersWorkForCompany = await this.getUserWorkForCompaniesById(id, user);
        const { scoreCompany, companyReviews, workerReviews, userId, companyId } = updateUsersWorkForCompaniesDto;
        usersWorkForCompany.scoreCompany = scoreCompany;
        usersWorkForCompany.companyReviews = companyReviews;
        usersWorkForCompany.workerReviews = workerReviews;
        usersWorkForCompany.userId = userId;
        usersWorkForCompany.companyId = companyId;
        await this.usersWorkForCompaniesRepository.save(usersWorkForCompany);
        return usersWorkForCompany;
    }
    async delete(userId, companyId, user) {
        await this.usersWorkForCompaniesRepository.deleteAUserCompany(userId, companyId, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        get_usersWorkForComponaies_filter_dto_1.GetUsersWorkForComponiesFilterDto]),
    __metadata("design:returntype", Promise)
], UsersWorkForCompaniesService.prototype, "getUsersWorkForCompanies", null);
UsersWorkForCompaniesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usersWorkForCompanies_repository_1.UsersWorkForCompaniesRepository)),
    __metadata("design:paramtypes", [usersWorkForCompanies_repository_1.UsersWorkForCompaniesRepository])
], UsersWorkForCompaniesService);
exports.UsersWorkForCompaniesService = UsersWorkForCompaniesService;
//# sourceMappingURL=usersWorkForCompanies.service.js.map