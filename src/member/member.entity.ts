import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, ManyToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../project/project.entity';
import { RoomChat } from 'src/room-chat/room-chat.entity';
import { Task } from 'src/task/tasks.entity';
export enum Role { 
  ADMIN = 'admin',
  MEMBER = 'member',
}

@Entity()

export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.MEMBER
  })
  role: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  joinAt: Date;
// key - referance
  // user
  @ManyToOne(()=> User, (user) => user.memberShips, {onDelete: 'CASCADE'})
  user: User;
  // project
  @ManyToOne(()=> Project, (project) => project.members)
  project: Project;

  // room chat
  @OneToOne(()=> RoomChat, (roomChat) => roomChat.members)
  roomChat: RoomChat;

  // task
  @ManyToMany(()=> Task, (task) => task.assignTo)
  tasks: Task[];
}

