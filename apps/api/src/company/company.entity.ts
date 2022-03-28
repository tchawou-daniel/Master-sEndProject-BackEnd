import {Column, Entity, OneToMany} from "typeorm";
import {BaseEntity} from "@api/shared/entities/base.entity";
import {CompanySector, CompanyStatus, Hiring} from "../../common/types/company";
import {UsersWorkForCompanies} from "@api/usersWorkForCompanies/usersWorkForCompanies.entity";

@Entity()
export class Company extends BaseEntity {
    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: CompanyStatus,
        default: CompanyStatus.ACTIVE,
    })
    companyStatus?: CompanyStatus;

    @Column()
    country: string;

    @Column()
    town: string;

    @Column()
    street: string;

    @Column()
    zipCode: string;

    @Column({
        type: 'enum',
        enum: CompanySector,
        default: CompanySector.EAUDECHETS,
    })
    companySector?: CompanySector;

    @Column({
        type: 'enum',
        enum: Hiring,
        default: Hiring.ONGOING,
    })
    hiringStatus: Hiring;

    @Column({ type: 'timestamptz', default: null, nullable: true })
    clearedAt: Date;

    @OneToMany(() => UsersWorkForCompanies, usersWorkForCompanies => usersWorkForCompanies.company)
    public usersWorkForCompanies!: UsersWorkForCompanies[];
}
