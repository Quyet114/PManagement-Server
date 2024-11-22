import { IsEnum, IsOptional } from 'class-validator';
import { UserStatus } from '../user-status.enum';
export class UpdateUserStatusDto {
    @IsOptional()
    @IsEnum(UserStatus,{
        message: `Invalid status. Valids options are ${Object.values(UserStatus)}`
    })
    status?: UserStatus;
}