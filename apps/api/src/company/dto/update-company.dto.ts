import { IsNotEmpty, IsOptional } from 'class-validator';

import {
  CompanySector,
  CompanyStatus,
  Hiring,
} from '../../../common/types/company';

export class UpdateCompanyDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly companyStatus: CompanyStatus;

  @IsOptional()
  readonly country: string;

  @IsOptional()
  readonly town: string;

  @IsOptional()
  readonly street: string;

  @IsOptional()
  readonly zipCode: string;

  @IsOptional()
  readonly description: string;

  @IsOptional()
  readonly companySector: CompanySector;

  @IsOptional()
  readonly hiringStatus: Hiring;

  @IsOptional()
  readonly clearedAt: Date;
}
