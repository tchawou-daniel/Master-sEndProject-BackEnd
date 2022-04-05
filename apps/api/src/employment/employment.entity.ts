import { User } from '@api/auth/user.entity';
import { BaseEntity } from '@api/shared/entities/base.entity';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { EmploymentSector, Hiring } from '../../common/types/Employment';

@Entity()
export class Employment extends BaseEntity {
    @Column()
      name: string;

    @Column()
      description: string;

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
      enum: Hiring,
      default: Hiring.ONGOING,
    })
      hiringStatus: Hiring;

    @IsOptional()
    readonly clearedAt: Date;

    @IsOptional()
    readonly updateAt: Date;

    @IsOptional()
    readonly companyName: Date;

    @IsOptional()
    readonly hasManySubsidiaries: boolean;

    @IsOptional()
    readonly employementSector: EmploymentSector;

    @ManyToOne(_type => User, user => user.employment, { eager: false })
    @Exclude({ toPlainOnly: true })
      user: User;
}
