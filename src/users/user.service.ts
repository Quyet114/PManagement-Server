import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import {omit} from 'lodash';

// dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    // Create a new user
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        // existing email
        const existingUser = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new Error('Email is already in use');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashedPassword;

        const user = plainToClass(User, createUserDto);
        return await this.userRepository.save(user);
    }

    // Update user
    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({where:{id}});
        if(!user){
            throw new NotFoundException('User not found');
        }   
        if(updateUserDto.password){
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        // preclude fields not allowed
        const updateFields = omit(updateUserDto, ['id', 'email', 'created_at', 'updated_at']);

        // preclude fields undefined
        const cleanFields = Object.fromEntries(
            Object.entries(updateFields).filter(([_, v]) => v !== undefined)
        )
        return await this.userRepository.save({
            ...user,
            ...cleanFields
        });

    }

    // update user status
    async updateUserStatus(id: string, updateUserStatusDto: UpdateUserStatusDto): Promise<User> {
        const user = await this.userRepository.findOne({where:{id}});
        if(!user){
            throw new NotFoundException('User not found');
        }   
        return await this.userRepository.save({
            ...user,
            ...updateUserStatusDto
        });
    }

    // Find user by name
    async findUserByName(name: string): Promise<User[]> {
        return await this.userRepository.find({
            where: { fullname: name }
        });
    }
}
