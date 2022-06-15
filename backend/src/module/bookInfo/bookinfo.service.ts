import { BookInfoRepository } from './repository/bookinfo.repository';
import { Injectable } from '@nestjs/common';
import { BookInfoResponseDto } from './dto/bookInfoResponse.dto';
import { CommentDto } from './dto/comment.dto';
import { getConnection, getManager } from 'typeorm';

@Injectable()
export class BookinfoService {
  constructor(private readonly bookInfoRepository: BookInfoRepository) {}

  async getBookInfo(bookId: number): Promise<BookInfoResponseDto> {
    const book = await this.bookInfoRepository.getBookInfo(bookId);
    const [bookComments, commentsCount] =
      await this.bookInfoRepository.getBookComments(bookId);

    const result: BookInfoResponseDto = {
      success: true,
      message: '책 상세페이지 전달 성공',
      book,
      bookComments,
      maxComment: Math.ceil(commentsCount / 10),
    };
    return result;
  }

  async writeComment(bookId: number, userId: number, comment: CommentDto) {
    const { commentTitle, commentText, bookRating } = comment;
    const queryRunner = await getConnection().createQueryRunner();

    await queryRunner.startTransaction();

    let flag = true;
    try {
      await this.bookInfoRepository.writeBookComment(
        queryRunner.manager,
        bookId,
        userId,
        commentTitle,
        commentText,
        bookRating,
      );

      await this.bookInfoRepository.plusCommentCountInBooksEntity(
        queryRunner.manager,
        bookId,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      flag = false;
    } finally {
      await queryRunner.release();
    }

    console.log('test: ', flag);
    if (flag) return true;
    return false;
  }
}
