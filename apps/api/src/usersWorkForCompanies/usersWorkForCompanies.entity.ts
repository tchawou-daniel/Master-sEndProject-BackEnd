import { Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "@api/auth/user.entity";
import {Company} from "@api/company/company.entity";
import {BaseEntity} from "@api/shared/entities/base.entity";

@Entity()
export class UsersWorkForCompanies extends BaseEntity {
    @Column()
    public userId!: number

    @Column()
    public companyId!: number

    @Column()
    public scoreCompany!: number

    @Column()
    public companyReviews!: string

    @Column()
    public workerReviews!: string

    @ManyToOne(() => User, (user) => user.usersWorkForCompanies)
    public user!: User

    @ManyToOne(() => Company, (category) => category.usersWorkForCompanies)
    public company!: Company
}
