import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUsersWorkForCompaniesDto {
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

  @IsNotEmpty()
  companyId: string;
}
