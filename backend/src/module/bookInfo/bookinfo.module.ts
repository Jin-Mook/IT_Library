import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookinfoController } from './bookinfo.controller';
import { BookinfoService } from './bookinfo.service';
import { BooksEntity } from 'src/entity/books.entity';
import { BookCommentsEntity } from 'src/entity/bookComments.entity';
import { BookInfoRepository } from './repository/bookinfo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BooksEntity, BookCommentsEntity])],
  controllers: [BookinfoController],
  providers: [BookinfoService, BookInfoRepository],
})
export class BookInfoModule {}
