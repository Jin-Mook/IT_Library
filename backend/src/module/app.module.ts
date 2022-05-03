import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MainPageModule } from './mainPage/mainpage.module';
import { CategoryModule } from './category/category.module';
import { BookInfoModule } from './bookInfo/bookinfo.module';
import { BookReviewModule } from './bookReview/bookreview.module';
import { BookReviewInfoModule } from './bookReviewInfo/bookreviewinfo.module';
import { MyInfoModule } from './myInfo/myinfo.module';
import { LiveChatModule } from './liveChat/livechat.module';
import { ChatRoomModule } from './chatRoom/chatroom.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    AuthModule,
    MainPageModule,
    CategoryModule,
    BookInfoModule,
    BookReviewModule,
    BookReviewInfoModule,
    MyInfoModule,
    LiveChatModule,
    ChatRoomModule,
  ],
})
export class AppModule {}
