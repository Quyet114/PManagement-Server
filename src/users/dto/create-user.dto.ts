import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(['backend', 'fontend', 'fullstack', 'tester', 'devops', 'manager', 'admin', 'guest'])
    @IsOptional()
    role?: string;
}
