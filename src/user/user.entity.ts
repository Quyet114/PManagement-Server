import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserStatus } from "./user-status.enum";

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

}