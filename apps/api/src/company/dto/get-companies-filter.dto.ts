import { Company } from '@api/company/company.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { Hiring } from '../../../common/types/company';
import { FilterDto } from '@api/SHARED/dto/filter.dto';

export class GetCompaniesFilterDto extends FilterDto {
    @IsOptional()
    @IsEnum(Company)
    readonly hiringStatus?: Hiring;
}
