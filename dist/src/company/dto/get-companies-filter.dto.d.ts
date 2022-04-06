import { Hiring } from '../../../common/types/company';
import { FilterDto } from '@api/shared/dto/filter.dto';
export declare class GetCompaniesFilterDto extends FilterDto {
    readonly hiringStatus?: Hiring;
}
