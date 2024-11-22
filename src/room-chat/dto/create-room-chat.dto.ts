import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRoomChatDto {
  @IsNotEmpty()
  @IsUUID()
  projectId: string;

  @IsArray()
  @IsNotEmpty()
  @IsUUID()
  userCreateId: string;
}