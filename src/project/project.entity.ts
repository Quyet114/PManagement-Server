import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from '../users/user.entity';
import {Member} from '../member/member.entity';
import {Task} from '../task/tasks.entity';
import { Notification } from '../notification/notification.entity';
@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable:true})
  description: string;

  @Column({nullable:true})
  avatar: string;

  @Column({nullable:true})
  status: string;
  enum: ['active', 'inactive'];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({type: 'date', nullable:true})
  startDate: Date;

  @Column({type: 'date', nullable:true})
  endDate: Date;

// key - referance
  // user
  @ManyToOne(()=> User, (user) => user.memberShips, {onDelete: 'CASCADE'})
  createdBy: User;

  // member
  @OneToMany(()=> Member, (member) => member.project)
  members: Member[];

  // Task
  @OneToMany(()=> Task, (task) => task.project)
  stacks: Task[];

  // Notification
  @OneToMany(()=> Notification, (notification) => notification.project)
  notifications: Notification[];


}