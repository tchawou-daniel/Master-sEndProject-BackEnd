import { Company } from '@api/company/company.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { Hiring } from '../../../common/types/company';

export class GetUsersWorkForComponaiesFilterDto {
  @IsOptional()
  @IsEnum(Company)
  hiringStatus?: Hiring;

  @IsOptional()
  @IsString()
  search?: string;
}
