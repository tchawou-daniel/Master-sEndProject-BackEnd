import { IsNotEmpty } from 'class-validator';

import { Hiring } from '../../../common/types/employment';

export class UpdateEmploymentStatusDto {
  @IsNotEmpty()
  readonly hiringStatus: Hiring;
}
