import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: number;

    @IsOptional()
    @IsString()
    fullname: string;

    @IsOptional()
    @IsString()
    avatar: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    gender: string;

    @IsOptional()
    @IsString()
    address: string;
}
