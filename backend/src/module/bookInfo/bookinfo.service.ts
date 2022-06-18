import { BookInfoRepository } from './repository/bookinfo.repository';
import { Injectable } from '@nestjs/common';
import { BookInfoResponseDto } from './dto/bookInfoResponse.dto';
import { CommentDto } from './dto/comment.dto';
import { getConnection } from 'typeorm';

@Injectable()
export class BookinfoService {
  constructor(private readonly bookInfoRepository: BookInfoRepository) {}

  // 책 상세정보 전달
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

  // 댓글 작성
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

  // 댓글 수정 요청
  async getCommentForUpdate(commentId: number) {
    const targetComment = await this.bookInfoRepository.getComment(commentId);
    return targetComment;
  }

  // 댓글 수정
  async updateComment(commentId: number, userId: number, comment: CommentDto) {
    const { commentTitle, commentText, bookRating } = comment;
    await this.bookInfoRepository.updateComment(
      commentId,
      userId,
      commentTitle,
      commentText,
      bookRating,
    );

    const updatedComment = await this.bookInfoRepository.getComment(commentId);
    return updatedComment;
  }

  // 댓글 삭제
  async deleteComment(commentId: number, bookId: number, userId: number) {
    const deleteInfo = await this.bookInfoRepository.deleteComment(
      commentId,
      userId,
    );
    console.log(deleteInfo);
    console.log(deleteInfo.affected);
    if (deleteInfo.affected === 1) {
      const queryRunner = await getConnection().createQueryRunner();
      await this.bookInfoRepository.plusCommentCountInBooksEntity(
        queryRunner.manager,
        bookId,
        false,
      );
      return true;
    }

    return false;
  }
}
