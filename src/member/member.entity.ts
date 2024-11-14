import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../project/project.entity';
@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({default: 'member'})
  role: string;
  enum: ['admin', 'member'];

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  joinAt: Date;
// key - referance
  // user
  @ManyToOne(()=> User, (user) => user.memberShips, {onDelete: 'CASCADE'})
  user: User;
  // project
  @OneToMany(()=> Project, (project) => project.members)
  project: Project;

}

