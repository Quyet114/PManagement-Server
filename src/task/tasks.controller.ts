import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {TaskStatus } from './tasks-status.enum';
import { Task } from './tasks.entity';

// dto
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskMembersDto } from './dto/update-task-members.dto';
// guard
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/guard/role-decorator';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    // create task
    @Post('create')
    @UseGuards(RoleGuard)
    @Roles('admin')
    async createTask(
        @Body() createTaskDto: CreateTaskDto
    ): Promise<Task> {
        return await this.tasksService.createTask(createTaskDto);
    }

    // update member of task
    @Patch('update-members/:id')
    @UseGuards(RoleGuard)
    @Roles('admin')
    async updateTaskMembers(
        @Param('id') id: string,
        @Body() updateTaskMembersDto: UpdateTaskMembersDto
    ): Promise<Task> {
        return await this.tasksService.updateTaskMembers(id, updateTaskMembersDto);
    }
}

