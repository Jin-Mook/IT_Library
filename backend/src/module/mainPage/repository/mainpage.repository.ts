import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookCategoriesEntity } from 'src/entity/bookCategories.entity';
import { BooksEntity } from 'src/entity/books.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MainPageRepository {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksModel: Repository<BooksEntity>,
    @InjectRepository(BookCategoriesEntity)
    private readonly bookCategoriesModel: Repository<BookCategoriesEntity>,
  ) {}

  private readonly basicType = [
    'book_rating',
    'book_like_count',
    'book_publish_date',
  ];

  // book_rating, book_like_count, book_publish_date
  async findAllBooks() {
    const booksWithTypes = await Promise.all(
      this.basicType.map(async (el) => {
        const booksWithType = await this.booksModel
          .createQueryBuilder('book')
          .select([
            'book.id',
            'book.book_title',
            'book.book_image',
            'book_writer',
            'book.book_publish_date',
            'book.book_rating',
            'book.book_like_count',
          ])
          .orderBy(`book.${el}`, 'DESC')
          .where(`not book.${el} is null`)
          .limit(10)
          .getMany();

        return booksWithType;
      }),
    );

    return booksWithTypes;
  }

  async findAllCategories() {
    const categories = await this.bookCategoriesModel.find();
    return categories;
  }

  async findMainpageBooksWithTitle(title: string, view: number, page: number) {
    const books = this.booksModel
      .createQueryBuilder('book')
      .select([
        'book.id',
        'book.book_title',
        'book.book_image',
        'book.book_writer',
        'book.book_publish_date',
        'book.book_rating',
        'book.book_like_count',
      ])
      .where(`book.book_title like '%${title}%'`)
      .offset(view * (page - 1))
      .limit(view)
      .getManyAndCount();

    return books;
  }
}
