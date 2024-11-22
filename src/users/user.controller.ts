
import { Controller, Get, Post, Put, Param, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';


// dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
// guard
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/guard/role-decorator';
import { AuthGuard } from 'src/guard/auth.guard';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Create a new user
    @Post('create')
    @UseGuards(RoleGuard)
    @Roles('admin')
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<User> {
        return await this.userService.createUser(createUserDto);
    }

    // Update user
    @Post('update/:id')
    @UseGuards(AuthGuard)
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return await this.userService.updateUser(id, updateUserDto);
    }

    // Update user status
    @Put('update-status/:id')
    @UseGuards(AuthGuard)
    async updateStatus(
        @Param('id') id: string,
        @Body() updateStatusDto: UpdateUserStatusDto
    ): Promise<User> {
        return await this.userService.updateUserStatus(id, updateStatusDto);
    }

    // Find user by name
    @Get('find/:name')
    @UseGuards(AuthGuard)
    async findUserByName(
        @Param('name') name: string
    ): Promise<User[]> {
        return await this.userService.findUserByName(name);
    }
}   
