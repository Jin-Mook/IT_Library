import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BookinfoService } from './bookinfo.service';

@Controller('/api/bookinfo/:bookId')
export class BookinfoController {
  constructor(private readonly bookInfoService: BookinfoService) {}

  @Get()
  async getBookInfo(@Param('bookId', ParseIntPipe) bookId: number) {
    return await this.bookInfoService.getBookInfo(bookId);
  }
}
