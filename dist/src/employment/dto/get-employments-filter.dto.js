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
exports.GetEmploymentsFilterDto = void 0;
const employment_entity_1 = require("../employment.entity");
const class_validator_1 = require("class-validator");
const Employment_1 = require("../../../common/types/Employment");
const filter_dto_1 = require("../../shared/dto/filter.dto");
class GetEmploymentsFilterDto extends filter_dto_1.FilterDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(employment_entity_1.Employment),
    __metadata("design:type", String)
], GetEmploymentsFilterDto.prototype, "hiringStatus", void 0);
exports.GetEmploymentsFilterDto = GetEmploymentsFilterDto;
//# sourceMappingURL=get-employments-filter.dto.js.map