import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';


export class UpdateTaskMembersDto {
    @IsArray()
    @IsNotEmpty({each: true})
    assignToIds: string[];

    @IsNotEmpty()
    taskId: string;
}