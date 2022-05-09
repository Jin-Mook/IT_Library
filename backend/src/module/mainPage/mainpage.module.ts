import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategoriesEntity } from 'src/entity/bookCategories.entity';
import { BooksEntity } from 'src/entity/books.entity';
import { MainpageController } from './mainpage.controller';
import { MainpageService } from './mainpage.service';
import { MainPageRepository } from './repository/mainpage.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BooksEntity, BookCategoriesEntity])],
  controllers: [MainpageController],
  providers: [MainpageService, MainPageRepository],
})
export class MainPageModule {}
