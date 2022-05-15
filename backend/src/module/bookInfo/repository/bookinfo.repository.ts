import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookCommentsEntity } from 'src/entity/bookComments.entity';
import { BooksEntity } from 'src/entity/books.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookInfoRepository {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksModel: Repository<BooksEntity>,
    @InjectRepository(BookCommentsEntity)
    private readonly bookCommentsModel: Repository<BookCommentsEntity>,
  ) {}

  async getBookInfo(bookId: number) {
    const bookInfo = await this.booksModel
      .createQueryBuilder('book')
      .select()
      .where(`book.id = ${bookId}`)
      .getOne();

    return bookInfo;
  }

  async getBookComments(bookId: number) {
    const bookComments = await this.bookCommentsModel
      .createQueryBuilder('comment')
      .select()
      .where(`comment.book_id = ${bookId}`)
      .orderBy('comment.created_at', 'DESC')
      .getManyAndCount();

    return bookComments;
  }
}
