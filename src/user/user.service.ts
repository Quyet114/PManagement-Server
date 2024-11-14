import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserStatusDto } from './dto/get-user-filter-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.save(createUserDto);
    }

    async findAllUser(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUser(id: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return user;
    }

    async getUsers(filterDto: GetUserStatusDto): Promise<User[]> {
        return await this.userRepository.find({ where: filterDto });
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        let user = await this.userRepository.findOneBy({ id: id });

        if (!user) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        };
        user = {
            ...user,
            ...updateUserDto
        };
        return await this.userRepository.save(user);
    }
    async updateUserStatus(id: string, updateUserStatus: UpdateUserStatusDto): Promise<User> {
        const { status } = updateUserStatus;
        let user = await this.getUser(id);
        user.status = status;
        return await this.userRepository.save(user);
    }
    async findUserByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ username: username });
    }
}
