import { Column, Entity } from 'typeorm';
import {SEX, UserRole, WorkerIntegrationStatus} from "../../common/types/user";
import {BaseEntity} from "@api/shared/entities/base.entity";

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYMENT_AGENCY,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: WorkerIntegrationStatus,
    default: WorkerIntegrationStatus.NO_STATUS,
  })
  workerIntegrationStatus: WorkerIntegrationStatus;

  @Column({ default: null })
  bio: string;

  @Column({ default: null })
  avatar: string;

  @Column({ type: 'timestamptz', default: null, nullable: true })
  clearedAt: Date;

  @Column({ type: 'timestamptz', default: null, nullable: true })
  joinAt: Date;

  @Column({ type: 'timestamptz', default: null, nullable: true })
  lastConnection: Date;

  @Column({
    type: 'enum',
    enum: SEX,
    default: SEX.MALE,
  })
  sex: SEX;

}
