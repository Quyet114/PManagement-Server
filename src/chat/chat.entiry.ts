import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { RoomChat } from 'src/room-chat/room-chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;
  // status
  @Column({ type: 'enum', enum: ['sent', 'unread', 'read'], default: 'sent' })
  status: 'sent' | 'unread' | 'read';

  // key - referance
  // user
  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  user: User;

  // roomChat
  @ManyToOne(() => RoomChat, (roomChat) => roomChat.messages, { onDelete: 'CASCADE' })
  roomChat: RoomChat;
}