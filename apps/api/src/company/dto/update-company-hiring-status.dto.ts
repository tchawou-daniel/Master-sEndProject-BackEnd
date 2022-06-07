import { IsOptional } from 'class-validator';

import { Hiring } from '../../../common/types/company';

export class UpdateCompanyHiringStatusDto {
  @IsOptional()
  readonly hiringStatus: Hiring;
}
