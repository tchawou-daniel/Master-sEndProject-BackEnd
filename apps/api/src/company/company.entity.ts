import { User } from '@api/auth/user.entity';
import { BaseEntity } from '@api/../../SHARED/entities/base.entity';
import { UsersWorkForCompanies } from '@api/usersWorkForCompanies/usersWorkForCompanies.entity';
import { Exclude } from 'class-transformer';
import {
  Column, Entity, ManyToOne, OneToMany, Unique,
} from 'typeorm';

import { CompanySector, CompanyStatus, Hiring } from '../../common/types/company';

@Entity()
@Unique('index_name', ['name'])
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

    @Column()
      description: string;

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

    @ManyToOne(_type => User, user => user.company, { eager: false })
    @Exclude({ toPlainOnly: true })
      user: User;

    @OneToMany(() => UsersWorkForCompanies, usersWorkForCompanies => usersWorkForCompanies.company)
    public usersWorkForCompanies!: UsersWorkForCompanies[];
}
