import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { BookinfoService } from './bookinfo.service';
import { CommentDto } from './dto/comment.dto';
import { CommentParamsDto } from './dto/commentParam.dto';
import { CommentPipe } from './pipe/comment.pipe';
import { CommentParamsPipe } from './pipe/commentParam.pipe';

@Controller('/api/bookinfo/:bookId')
export class BookinfoController {
  constructor(private readonly bookInfoService: BookinfoService) {}

  @Get()
  async getBookInfo(@Param('bookId', ParseIntPipe) bookId: number) {
    return await this.bookInfoService.getBookInfo(bookId);
  }

  // 댓글 작성
  @Post('comment')
  async writeComment(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body(CommentPipe) comment: CommentDto,
    @Session() session,
  ) {
    console.log(comment);

    const userId = session.userId;
    if (userId) {
      const result = await this.bookInfoService.writeComment(
        bookId,
        userId,
        comment,
      );
      console.log('result: ', result);
      if (result) return { success: true, message: '댓글 작성 완료' };

      return { success: false, message: '서버 에러' };
    } else {
      return { seccess: false, message: '로그인이 필요합니다.' };
    }
  }

  // 댓글 수정 요청
  @Get('comment/:commentId')
  async getCommentForUpdate(
    @Param(CommentParamsPipe) params: CommentParamsDto,
  ) {
    const { bookId, commentId } = params;
    const commentInfo = await this.bookInfoService.getCommentForUpdate(
      commentId,
    );
    if (!commentInfo)
      return { success: false, message: '해당하는 댓글이 없습니다.' };

    const result = {
      success: true,
      message: '댓글 전달 성공',
      bookComment: commentInfo,
    };
    return result;
  }

  // 댓글 수정
  @Patch('comment/:commentId')
  async updateComment(
    @Param(CommentParamsPipe) params: CommentParamsDto,
    @Body(CommentPipe) comment: CommentDto,
    @Session() session,
  ) {
    const { bookId, commentId } = params;
    const userId = session.userId;

    if (!userId) return { success: false, message: '로그인이 필요합니다.' };

    const updatedComment = await this.bookInfoService.updateComment(
      commentId,
      userId,
      comment,
    );

    if (!updatedComment) return { success: false, message: '댓글 수정 실패' };

    const result = {
      success: true,
      message: '댓글 수정 성공',
      bookComment: updatedComment,
    };
    return result;
  }

  // 댓글 삭제
  @Delete('comment/:commentId')
  async deleteComment(
    @Param(CommentParamsPipe) params: CommentParamsDto,
    @Session() session,
  ) {
    const { bookId, commentId } = params;
    const userId = session.userId;

    if (!userId) return { success: false, message: '로그인이 필요합니다.' };

    const deleteCheck = await this.bookInfoService.deleteComment(
      commentId,
      bookId,
      userId,
    );
    if (deleteCheck === false)
      return { success: false, message: '댓글삭제 실패' };

    return { success: true, message: '댓글삭제 성공' };
  }
}
