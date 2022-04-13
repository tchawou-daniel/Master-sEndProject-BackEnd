import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersWorkForComponiesFilterDto {
  @IsOptional()
  @IsNumber()
  scoreCompany?: number;

  @IsOptional()
  @IsString()
  companyReviews?: string;

  @IsOptional()
  @IsNumber()
  workerReviews?: number;
}
