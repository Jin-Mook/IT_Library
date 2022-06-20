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

  private readonly orderCondition: string[] = [
    'book_title',
    'book_publish_date',
    'book_rating',
    'book_like_count',
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
            'book.book_writer',
            'book.book_publisher',
            'book.book_publish_date',
            'book.book_category',
            'book.book_info',
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

  async findMainpageBooksWithTitle(
    title: string,
    view: number,
    page: number,
    sortMethod: number,
  ) {
    let books;
    if (sortMethod === 1) {
      books = this.booksModel
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
        .where(`book.book_title like '%${title}%'`)
        .offset(view * (page - 1))
        .limit(view)
        .orderBy(`book.${this.orderCondition[sortMethod - 1]}`, 'ASC')
        .getManyAndCount();
    } else {
      books = this.booksModel
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
        .where(`book.book_title like '%${title}%'`)
        .offset(view * (page - 1))
        .limit(view)
        .orderBy(`book.${this.orderCondition[sortMethod - 1]}`, 'DESC')
        .getManyAndCount();
    }

    return books;
  }

  // 좋아요 증가
  async updateLikeCount(bookId: number) {
    const updatedLikeCount = await this.booksModel
      .createQueryBuilder()
      .update(BooksEntity)
      .set({ book_like_count: () => 'book_like_count + 1' })
      .where(`id = ${bookId}`)
      .execute();

    return updatedLikeCount;
  }
}
