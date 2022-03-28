import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "@api/auth/user.entity";
import {Company} from "@api/company/company.entity";

@Entity()
export class UsersWorkForCompanies extends BaseEntity {
    @Column()
    public userId!: number

    @Column()
    public companyId!: number

    @Column()
    public order!: number

    @ManyToOne(() => User, (user) => user.usersWorkForCompanies)
    public user!: User

    @ManyToOne(() => Company, (category) => category.usersWorkForCompanies)
    public company!: Company
}
