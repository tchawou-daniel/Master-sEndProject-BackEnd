import { IsEnum } from 'class-validator';

import { Hiring } from '../../../common/types/employment';

export class UpdateEmploymentStatusDto {
  @IsEnum(Hiring)
  hiringStatus: Hiring;
}
