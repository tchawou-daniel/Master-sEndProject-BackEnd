import {Column, Entity} from "typeorm";
import {BaseEntity} from "@api/shared/entities/base.entity";
import {CompanySector, CompanyStatus} from "../../common/types/company";

@Entity()
export class CompanyEntity extends BaseEntity {
    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: CompanyStatus,
        default: CompanyStatus.ACTIVE,
    })
    companyStatus?: CompanyStatus;


    @Column({
        type: 'enum',
        enum: CompanySector,
        default: CompanySector.EAUDECHETS,
    })
    companySector?: CompanySector;

    @Column({ type: 'timestamptz', default: null, nullable: true })
    clearedAt: Date;
}
