import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {TaskStatus } from './tasks-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './tasks.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get('/:id')
    getTaskById(@Param('id') id: string) :Promise<Task>{
        return this.tasksService.getTaskById(id);
    }
    @Get()
    getTasks():Promise<Task[]>{
        return this.tasksService.getTasks();
    }
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }
    @Patch('/:id')
    updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<Task>{
        return this.tasksService.updateTask(id,updateTaskDto);
    }
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskStatus: UpdateTaskStatusDto,
    ):Promise<Task>{
        return this.tasksService.updateTaskStatus(id,updateTaskStatus);
    }
    @Delete()
    deleteTask(@Param('id') id:string):Promise<void>{
        return this.tasksService.deleteTask(id)
    }

}

