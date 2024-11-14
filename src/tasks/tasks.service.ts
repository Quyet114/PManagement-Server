import { Injectable, NotFoundException } from '@nestjs/common';
import {TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ){}
    //
    async getTaskById(id: string): Promise<Task | null>{
        const found = await this.taskRepository.findOneBy({id});
        if(!found){
            throw new NotFoundException(`Task with ID: "${id}" not found`);
        }
        return found;
    }
    //
    async getTasks(): Promise<Task[]>{
        return await this.taskRepository.find();
    }
    //
    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const task = this.taskRepository.create(createTaskDto);
        return await this.taskRepository.save(task);
    }
    //
    async updateTask(id: string, updateTaskDto:  UpdateTaskDto): Promise<Task>{
        let task = await this.taskRepository.findOneBy({id:id})
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        task = {
            ...task,
            ...updateTaskDto
        };
        return await this.taskRepository.save(task);
    }
    //
    async deleteTask(id:string): Promise<void>{
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }
    //
    async updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        const { status } = updateTaskStatusDto;
        let task = await this.getTaskById(id);
        task.status = status;
        return await this.taskRepository.save(task);
    }
}
