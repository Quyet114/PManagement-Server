import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserStatus } from "./user-status.enum";
import { Error } from "../error/errot.entity";
import { Member } from "../member/member.entity";
import { Comment } from "../comment/comment.entity";
import { Project } from "../project/project.entity";
import { Task } from "../task/tasks.entity";
import { Notification } from "../notification/notification.entity";
@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column()
    role:number;

    @Column()
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
}