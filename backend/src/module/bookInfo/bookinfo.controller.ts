import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Session,
} from '@nestjs/common';
import { BookinfoService } from './bookinfo.service';
import { CommentDto } from './dto/comment.dto';
import { CommentPipe } from './pipe/comment.pipe';

@Controller('/api/bookinfo/:bookId')
export class BookinfoController {
  constructor(private readonly bookInfoService: BookinfoService) {}

  @Get()
  async getBookInfo(@Param('bookId', ParseIntPipe) bookId: number) {
    return await this.bookInfoService.getBookInfo(bookId);
  }

  @Post('comment')
  async writeComment(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body(CommentPipe) comment: CommentDto,
    @Session() session,
  ) {
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
}
