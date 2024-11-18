import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserStatus } from "./user-status.enum";
import { Error } from "../error/errot.entity";
import { Member } from "../member/member.entity";
import { Comment } from "../comment/comment.entity";
import { Project } from "../project/project.entity";
import { Task } from "../task/tasks.entity";
import { Notification } from "../notification/notification.entity";
import { RoomChat } from "../room-chat/room-chat.entity";
import { Message } from "../chat/chat.entiry";
@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;
    
    @Column()
    password: string;

    @Column({type: 'enum', enum:['backend', 'fontend', 'fullstack', 'tester', 'devops', 'manager', 'admin', 'guest'], default:'fullstack'})
    role:'backend' | 'fontend' | 'fullstack' |'tester' | 'devops' | 'manager' | 'admin'| 'guest';

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE
    })
    status: UserStatus;

// information basic
    @Column({nullable:true})
    fullname:string;

    @Column({nullable:true})
    avatar:string;

    @Column({nullable:true})
    phone:string;

    @Column({nullable:true})
    gender:string;

    @Column({nullable:true})
    address:string;
// key - referance
    // report
    @OneToMany(()=> Error, (error) => error.reportedBy)
    reportedErrors: Error[];

    @OneToOne(()=> Error, (error) => error.assignedTo)
    assignedError: Error;

    // member
    @OneToMany(()=> Member, (member) => member.user)
    memberShips: Member[];

    // comment
    @OneToMany(()=> Comment, (comment) => comment.user)
    comments: Comment[];

    // project
    @OneToMany(()=> Project, (project) => project.createdBy)
    projects: Project[];

    // task
    @OneToMany(()=> Task, (task) => task.assignTo)
    tasks: Task[];

    //notification
    @OneToMany(()=> Notification, (notification) => notification.user)
    notifications: Notification[];

    //room chat
    @ManyToMany(()=> RoomChat, (roomChat) => roomChat.participants)
    participatingRooms: RoomChat[];

    @ManyToMany(()=> RoomChat, (roomChat) => roomChat.admins)
    adminRooms: RoomChat[];

    @OneToMany(()=> RoomChat, (roomChat) => roomChat.userCreate)
    createdRooms: RoomChat[];

    // chat
    @OneToMany(()=> Message, (message) => message.user)
    messages: Message[];
}