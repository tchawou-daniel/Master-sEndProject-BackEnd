import { User } from '@api/auth/user.entity';
import { Company } from '@api/company/company.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../SHARED/entities/base.entity';

@Entity()
export class UsersWorkForCompanies extends BaseEntity {
  @Column()
  public userId!: string;

  @Column()
  public companyId!: string;

  @Column({ type: 'int', nullable: true })
  public scoreCompany!: number;

  @Column({ type: 'int', nullable: true })
  public companyReviews!: number;

  @Column({ type: 'int', nullable: true })
  public workerReviews!: number;

  @ManyToOne(() => User, (user) => user.usersWorkForCompanies)
  public user!: User;

  @ManyToOne(() => Company, (category) => category.usersWorkForCompanies)
  public company!: Company;
}
