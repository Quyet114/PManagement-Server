import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
  OneToOne,
  JoinTable,
  OneToMany
} from 'typeorm';

import { User } from '../users/user.entity';
import { Project } from 'src/project/project.entity';
import { Message } from 'src/chat/chat.entiry';

@Entity()
export class RoomChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

// key - referance
  // user
  @ManyToOne(() => User, (user) => user.createdRooms, { onDelete: 'SET NULL' })
  userCreate: User; 

  @ManyToMany(() => User, (user) => user.adminRooms)
  @JoinTable() 
  admins: User[]; 

  @ManyToMany(() => User, (user) => user.participatingRooms)
  @JoinTable() 
  participants: User[]; 

  // project
  @OneToOne(() => Project, (project) => project.roomChat, { nullable: true })
  project: Project;

  // message  
  @OneToMany(() => Message, (message) => message.roomChat)
  messages: Message[];

}
