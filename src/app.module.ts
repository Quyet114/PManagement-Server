import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './task/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';
import { MemberModule } from './member/member.module';

import { ErrorModule } from './error/error.module';
import { NotificationModule } from './notification/notification.module';
import { ProjectModule } from './project/project.module';
import { ChatModule } from './chat/chat.module';
import { RoomChatController } from './room-chat/room-chat.controller';
import { RoomChatService } from './room-chat/room-chat.service';
import { RoomChatModule } from './room-chat/room-chat.module';
@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'postgres',
      database:'task-management',
      autoLoadEntities:true,
      synchronize:true,
    }),
    AuthModule,
    UserModule,
    MemberModule,
    ErrorModule,
    NotificationModule,
    ProjectModule,
    ChatModule,
    RoomChatModule
  ],
  controllers: [AppController, MemberController, RoomChatController],
  providers: [AppService, MemberService, RoomChatService],
})
export class AppModule {}
