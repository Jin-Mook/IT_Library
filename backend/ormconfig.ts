import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { BookCategoriesEntity } from 'src/entity/bookCategories.entity';
import { BookCommentsEntity } from 'src/entity/bookComments.entity';
import { BookReviewsEntity } from 'src/entity/bookReviews.entity';
import { BooksEntity } from 'src/entity/books.entity';
import { ChatMessagesEntity } from 'src/entity/chatMessages.entity';
import { ChatRoomsEntity } from 'src/entity/chatRooms.entity';
import { ReviewCommentsEntity } from 'src/entity/reviewComments.entity';
import { UsersEntity } from 'src/entity/users.entity';

dotenv.config({ path: './.development.env' });
export const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: +process.env.PORT,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [
    BooksEntity,
    BookCommentsEntity,
    BookCategoriesEntity,
    UsersEntity,
    ChatMessagesEntity,
    ChatRoomsEntity,
    BookReviewsEntity,
    ReviewCommentsEntity,
  ],
  synchronize: false,
  logging: true,
};
