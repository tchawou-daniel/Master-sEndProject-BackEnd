import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUsersWorkForCompaniesDto {
  @IsOptional()
  @IsNumber()
  scoreCompany?: number;

  @IsOptional()
  @IsString()
  companyReviews?: string;

  @IsOptional()
  @IsNumber()
  workerReviews?: string;
}
