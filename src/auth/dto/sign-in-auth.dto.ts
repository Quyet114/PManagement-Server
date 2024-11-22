import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SignInAuthDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password: string;
}