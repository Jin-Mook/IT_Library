import { MainpageService } from './mainpage.service';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Session,
} from '@nestjs/common';
import { SearchOrCategoryPipe } from 'src/common/pipe/searchOrCategory.pipe';
import { SearchOrCategoryDto } from 'src/common/dto/searchOrCategory.dto';

@Controller('/api/mainPage')
export class MainpageController {
  constructor(private readonly mainpageService: MainpageService) {}

  @Get('/all')
  async getMainpageBooks() {
    return await this.mainpageService.getAllBooks();
  }

  @Get('search')
  async bookSearch(@Query(SearchOrCategoryPipe) query: SearchOrCategoryDto) {
    const { title, view, page, sortMethod } = query;
    console.log(title, view, page);
    return await this.mainpageService.findMainpageBooksWithTitle(
      title,
      view,
      page,
      sortMethod,
    );
  }

  @Get('like/:bookId')
  async likeBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Session() session,
  ) {
    const userId = session.userId;
    if (!userId) return { seccess: false, message: '로그인이 필요합니다.' };

    const updatedLikeCount = await this.mainpageService.pushLikeButton(bookId);

    if (updatedLikeCount.affected === 1) {
      return { success: true, message: '좋아요 완료' };
    } else {
      return { success: false, message: '좋아요 성공 실패' };
    }
  }
}
