import { Column, Entity, PrimaryGeneratedColumn , ManyToOne, OneToMany} from "typeorm";
import { TaskStatus } from "./tasks-status.enum";
import {Project} from '../project/project.entity';
import {User} from '../users/user.entity';
import {Notification} from '../notification/notification.entity';

@Entity()
export class Task{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    title:string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
// key - referance
    // project
    @ManyToOne(()=> Project, (project) => project.stacks)
    project: Project;

    // user
    @ManyToOne(()=> User, (user) => user.tasks)
    assignTo: User;

    // Notification
    @OneToMany(()=> Notification, (notification) => notification.task)
    notifications: Notification[];
}