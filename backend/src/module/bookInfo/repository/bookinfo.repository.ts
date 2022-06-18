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
    option = true,
  ) {
    if (option) {
      await transactionManager
        .createQueryBuilder()
        .update(BooksEntity)
        .set({
          comments_count: () => 'comments_count + 1',
        })
        .where(`id = ${bookId}`)
        .execute();
    } else {
      await transactionManager
        .createQueryBuilder()
        .update(BooksEntity)
        .set({
          comments_count: () => 'comments_count - 1',
        })
        .where(`id = ${bookId}`)
        .execute();
    }
  }

  // comment 정보 가져오기
  async getComment(commentId: number) {
    const comment = await this.bookCommentsModel
      .createQueryBuilder('comment')
      .select([
        'comment.id',
        'comment.book_id',
        'comment.user_id',
        'comment.comment_title',
        'comment.comment_context',
        'comment.comment_rating',
        'comment.updated_at',
      ])
      .where(`comment.id = ${commentId}`)
      .getOne();

    return comment;
  }

  // commentTitle, commentText, bookRating
  // 댓글 업데이트하기
  async updateComment(
    commentId: number,
    userId: number,
    commentTitle: string,
    commentText: string,
    bookRating: number,
  ) {
    await this.bookCommentsModel
      .createQueryBuilder('comment')
      .update(BookCommentsEntity)
      .set({
        comment_title: commentTitle,
        comment_rating: bookRating,
        comment_context: commentText,
      })
      .where(`id = ${commentId}`)
      .andWhere(`user_id = ${userId}`)
      .execute();
  }

  // 댓글 삭제하기
  async deleteComment(commentId: number, userId: number) {
    const deleteInfo = await this.bookCommentsModel
      .createQueryBuilder('comment')
      .delete()
      .from(BookCommentsEntity)
      .where(`id = ${commentId}`)
      .andWhere(`user_id = ${userId}`)
      .execute();

    return deleteInfo;
  }
}
