"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UsersRepository = class UsersRepository extends typeorm_1.Repository {
    async createUser(authCredentialsDto) {
        const { firstName, lastName, email, password } = authCredentialsDto;
        let logger = new common_1.Logger('UsersRepository');
        logger.verbose(`User "${authCredentialsDto}"`);
        console.log(authCredentialsDto);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({ firstName, lastName, email, password: hashedPassword });
        try {
            await this.save(user);
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Email already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
};
UsersRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.User)
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map