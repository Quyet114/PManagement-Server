import { Controller, Get, Post, Put, Param, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { Project } from './project.entity';

// service
import { ProjectService } from './project.service';
// dto
import { CreateProjectDto } from './dto/create-project.dto';


// guard
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/guard/role-decorator';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  // Create a new project 
  @Post('create')
  @UseGuards(RoleGuard)
  @Roles('admin', 'user')
  async createProject(
    @Body() createProjectDto: CreateProjectDto
  ): Promise<Project> {
    return await this.projectService.createProject(createProjectDto);
  }


}
