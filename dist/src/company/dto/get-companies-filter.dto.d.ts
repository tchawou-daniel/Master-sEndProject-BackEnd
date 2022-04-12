import { FilterDto } from '@api/SHARED/dto/filter.dto';
import { Hiring } from '../../../common/types/company';
export declare class GetCompaniesFilterDto extends FilterDto {
    readonly hiringStatus?: Hiring;
}
