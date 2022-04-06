import { Employment } from '@api/employment/employment.entity';
import { FilterDto } from '@api/SHARED/dto/filter.dto';
import { IsEnum, IsOptional } from 'class-validator';

import { Hiring } from '../../../common/types/employment';

export class GetEmploymentsFilterDto extends FilterDto {
  @IsOptional()
  @IsEnum(Employment)
  readonly hiringStatus?: Hiring;
}
