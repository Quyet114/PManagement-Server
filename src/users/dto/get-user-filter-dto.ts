import { IsOptional, IsEnum, IsString } from 'class-validator';
import { UserStatus } from '../user-status.enum';


export class GetUserStatusDto {
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;
    
    @IsOptional()
    @IsString()
    search?: string;
}
