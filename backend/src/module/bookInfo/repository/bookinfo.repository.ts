import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookCommentsEntity } from 'src/entity/bookComments.entity';
import { BooksEntity } from 'src/entity/books.entity';
import { EntityManager, Repository, TransactionManager } from 'typeorm';

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

  // 댓글작성 쿼리
  async writeBookComment(
    @TransactionManager() transactionManager: EntityManager,
    bookId: number,
    userId: number,
    commentTitle: string,
    commentText: string,
    bookRating: number,
  ) {
    await transactionManager
      .createQueryBuilder()
      .insert()
      .into(BookCommentsEntity)
      .values({
        book_id: bookId,
        user_id: userId,
        comment_title: commentTitle,
        comment_rating: bookRating,
        comment_context: commentText,
      })
      .execute();
  }

  // comment 추가 후 book테이블에서 comment개수 속성 수정하기
  async plusCommentCountInBooksEntity(
    @TransactionManager() transactionManager: EntityManager,
    bookId: number,
  ) {
    await transactionManager
      .createQueryBuilder()
      .update(BooksEntity)
      .set({
        comments_count: () => 'comments_count + 1',
      })
      .where(`id = ${bookId}`)
      .execute();
  }
}
