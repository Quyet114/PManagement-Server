
import { Controller,Get, Post, Put, Param, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserStatusDto } from './dto/get-user-filter-dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async createUser(@Body() createUserDto:CreateUserDto):Promise<User>{
        return await this.userService.createUser(createUserDto);
    }

    @Get()
    async findAllUsers(): Promise<User[]>{
        return await this.userService.findAllUser();
    }

    @Get(':id')
    async getUser(@Param('id') id:string ):Promise<User>{
        return await this.userService.getUser(id);
    }
    @Get('search')
    async getUsers( @Body() filterDto: GetUserStatusDto): Promise<User[]>{
        return await this.userService.getUsers(filterDto);
    }
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto):Promise<User>{
        const updateUser = await this.userService.updateUser(id,updateUserDto);
        if(!updateUser){
            throw new NotFoundException(`User with ID "${id}" not found`);

        }
        return updateUser;
    }
    @Put(':id/status')
    async updateUserStatus(@Param('id') id:string, @Body() updateUserStatus: UpdateUserStatusDto):Promise<User>{
        const updateUser = await this.userService.updateUserStatus(id,updateUserStatus);
        if(!updateUser){
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return updateUser;
    }
}
