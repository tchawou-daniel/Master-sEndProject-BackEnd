import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateUsersWorkForCompaniesDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  scoreCompany?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  companyReviews?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  workerReviews?: number;
}
