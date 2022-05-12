import { MainpageService } from './mainpage.service';
import { Controller, Get, Query } from '@nestjs/common';
import { SearchDto } from './dto/search.dto';
import { SearchPipe } from './pipe/search.pipe';

@Controller('/api/mainPage')
export class MainpageController {
  constructor(private readonly mainpageService: MainpageService) {}

  @Get('/all')
  async getMainpageBooks() {
    return await this.mainpageService.getAllBooks();
  }

  @Get('search')
  async bookSearch(@Query(SearchPipe) query: SearchDto) {
    const { title, view, page } = query;
    console.log(title, view, page);
    return await this.mainpageService.findMainpageBooksWithTitle(
      title,
      view,
      page,
    );
  }
}
