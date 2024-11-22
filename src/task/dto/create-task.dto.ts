import { IsNotEmpty , IsUUID} from "class-validator";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsUUID()
    projectId: string;
}