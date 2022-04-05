import { Employment } from '@api/employment/employment.entity';
import { IsEnum, IsOptional } from 'class-validator';

import { Hiring } from '../../../common/types/Employment';
import { FilterDto } from '@api/shared/dto/filter.dto';

export class GetEmploymentsFilterDto extends FilterDto {
    @IsOptional()
    @IsEnum(Employment)
    readonly hiringStatus?: Hiring;
}
