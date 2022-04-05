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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersWorkForComponaiesFilterDto = void 0;
const company_entity_1 = require("../../company/company.entity");
const class_validator_1 = require("class-validator");
const company_1 = require("../../../common/types/company");
class GetUsersWorkForComponaiesFilterDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(company_entity_1.Company),
    __metadata("design:type", String)
], GetUsersWorkForComponaiesFilterDto.prototype, "hiringStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetUsersWorkForComponaiesFilterDto.prototype, "search", void 0);
exports.GetUsersWorkForComponaiesFilterDto = GetUsersWorkForComponaiesFilterDto;
//# sourceMappingURL=get-usersWorkForComponaies-filter.dto.js.map