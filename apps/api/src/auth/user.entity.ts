import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {UserRole} from "../../common/user";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUser: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
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

  @Column({default: ''})
  bio: string;

  @Column({default: ''})
  avatar: string;

  @Column({ type: 'timestamp', default: null, nullable: true })
  clearedAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  joinAt: Date;

  @Column({ type: 'timestamp', default: null, nullable: true })
  lastConnection: Date;


}
