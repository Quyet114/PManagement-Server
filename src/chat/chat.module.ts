import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatMiddleware } from './chat.middleware';
@Module({
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule implements NestModule{
  // middleware for the chat module

  configure(consumer: import("@nestjs/common").MiddlewareConsumer) {

  // all requests to the chat module will pass through this middleware
    consumer
    .apply(ChatMiddleware)
    .forRoutes('chat');

  // middleware only use for POST
    consumer
    .apply(ChatMiddleware)
    .forRoutes({path:'chat', method:RequestMethod.POST});
    
  // exclude middleware for the login route
    consumer
    .apply(ChatMiddleware)
    .exclude({ path: 'user/login', method: RequestMethod.POST }) 
    .forRoutes('*');
  }



}
