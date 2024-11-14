import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import {Project} from '../project/project.entity';
import { Task } from '../task/tasks.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(()=> User, (user) => user.notifications)
  user: User[];

  @ManyToOne(()=> Project, (project) => project.notifications)
  project: Project;

  @ManyToOne(()=> Task, (task) => task.notifications)
  task: Task;
}