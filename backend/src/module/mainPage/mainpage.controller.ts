import { MainpageService } from './mainpage.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('/api/mainPage')
export class MainpageController {
  constructor(private readonly mainpageService: MainpageService) {}

  @Get('search')
  async bookSearch() {
    return 'hi';
  }

  @Get('/all')
  async getMainpageBooks() {
    return await this.mainpageService.getAllBooks();
  }
}
