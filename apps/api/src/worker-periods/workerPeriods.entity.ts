import { BaseEntity } from '@api/shared/entities/base.entity';
import { Column } from 'typeorm';

export class WorkerPeriodsEntity extends BaseEntity {

  @Column({ default: null, nullable: true, type: 'int' })
  effectiveAsOf: number;

  @Column({ default: null, nullable: true, type: 'int' })
  effectiveUntil: number;

}
