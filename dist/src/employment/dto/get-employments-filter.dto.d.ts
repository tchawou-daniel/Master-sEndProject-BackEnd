import { Hiring } from '../../../common/types/Employment';
import { FilterDto } from '@api/shared/dto/filter.dto';
export declare class GetEmploymentsFilterDto extends FilterDto {
    readonly hiringStatus?: Hiring;
}
