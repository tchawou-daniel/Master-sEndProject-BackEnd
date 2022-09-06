import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  @IsString()
  @Type(() => String)
  companyId?: string;

  @IsOptional()
  @IsString()
  @Type(() => String)
  userId?: string;
}
