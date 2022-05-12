import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksEntity } from 'src/entity/books.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksModel: Repository<BooksEntity>,
  ) {}

  private readonly orderCondition: string[] = [
    'book_title',
    'book_publish_date',
    'book_rating',
    'book_like_count',
  ];

  // 기본순, 신작순, 평점순, 찜한순, 도서명순
  async findCategoryBooks(
    sortMethod: number,
    page: number,
    view: number,
    categoryId: number,
  ) {
    let books;
    // 기본순(도서명순인 경우)
    if (sortMethod === 1) {
      books = await this.booksModel
        .createQueryBuilder('book')
        .select([
          'book.id',
          'book.book_title',
          'book.book_image',
          'book.book_writer',
          'book.book_publish_date',
          'book.book_rating',
          'book.book_like_count',
          'book.book_category',
        ])
        .where(`book.book_category = ${categoryId}`)
        .offset(view * (page - 1))
        .limit(view)
        .orderBy(`book.${this.orderCondition[sortMethod - 1]}`, 'ASC')
        .getManyAndCount();
    } else {
      books = await this.booksModel
        .createQueryBuilder('book')
        .select([
          'book.id',
          'book.book_title',
          'book.book_image',
          'book.book_writer',
          'book.book_publish_date',
          'book.book_rating',
          'book.book_like_count',
          'book.book_category',
        ])
        .where(`book.book_category = ${categoryId}`)
        .offset(view * (page - 1))
        .limit(view)
        .orderBy(`book.${this.orderCondition[sortMethod - 1]}`, 'DESC')
        .getManyAndCount();
    }

    return books;
  }

  async findCategoryBooksWithTitle() {}
}
