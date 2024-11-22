import { IsOptional, IsString, IsNotEmpty, IsDate, IsUUID, IsEnum } from "class-validator";
import { ProjectStatus } from "../project-status.enum";
export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;

  @IsUUID()
  @IsNotEmpty()
  createdById: string;

  @IsOptional()
  @IsEnum(ProjectStatus,{
    message: `status must be a valid enum value: ${Object.values(ProjectStatus)}`
  })
  status?: ProjectStatus;
}