import { FilterDto } from '@api/SHARED/dto/filter.dto';
import { Hiring } from '../../../common/types/employment';
export declare class GetEmploymentsFilterDto extends FilterDto {
    readonly hiringStatus?: Hiring;
}
