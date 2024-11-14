import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import {ErrorStatus} from './error-status.enum';
import { User } from 'src/users/user.entity';
@Entity()
export class Error {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  error: string;

  @Column()
  status: ErrorStatus;
// key - referance
  @OneToOne(()=> User , (user) => user.assignedError, {nullable:true})
  assignedTo: User;

  @ManyToOne(()=> User, (user) => user.reportedErrors)
  reportedBy: User;
}