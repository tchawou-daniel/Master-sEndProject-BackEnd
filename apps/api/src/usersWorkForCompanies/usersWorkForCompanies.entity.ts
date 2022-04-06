import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../SHARED/entities/base.entity';

@Entity()
export class UsersWorkForCompanies extends BaseEntity {
  @Column()
  public userId!: number;

  @Column()
  public companyId!: number;

  @Column()
  public scoreCompany!: number;

  @Column()
  public companyReviews!: string;

  @Column()
  public workerReviews!: string;

  @ManyToOne(() => User, (user) => user.usersWorkForCompanies)
  public user!: User;

  @ManyToOne(() => Company, (category) => category.usersWorkForCompanies)
  public company!: Company;
}
