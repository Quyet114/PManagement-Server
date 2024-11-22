import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';

import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { In, Repository } from 'typeorm';
import { Member } from 'src/member/member.entity';
// dto
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskMembersDto } from './dto/update-task-members.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>
    ) { }

    // create task
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskRepository.save(createTaskDto);
    }

    // update member of task
    async updateTaskMembers(id: string, updateTaskMembersDto: UpdateTaskMembersDto): Promise<Task> {
        const { taskId, assignToIds } = updateTaskMembersDto;

        const task = await this.taskRepository.findOne({ where: { id }, relations: ['assignTo'] });
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        const members = await this.memberRepository.find({ where: { id: In(assignToIds) } });
        if (members.length !== assignToIds.length) {
            throw new NotFoundException('Some members were not found');
        }
        task.assignTo = members;
        return await this.taskRepository.save(task);
    }
}
