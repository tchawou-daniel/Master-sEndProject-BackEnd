import { Company } from '@api/company/company.entity';
import { FilterDto } from '@api/SHARED/dto/filter.dto';
import { IsEnum, IsOptional } from 'class-validator';

import { Hiring } from '../../../common/types/company';

export class GetCompaniesFilterDto extends FilterDto {
  @IsOptional()
  @IsEnum(Company)
  readonly hiringStatus?: Hiring;
}
