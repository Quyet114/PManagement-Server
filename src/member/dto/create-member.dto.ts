import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @IsArray()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}