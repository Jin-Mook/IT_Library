import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SearchResponseDto } from '../mainPage/dto/searchResponse.dto';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CategoryPipe } from './pipe/category.pipe';

@Controller('/api/category/:categoryId')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategorypageBooks(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query(CategoryPipe) query: CategoryDto,
  ): Promise<SearchResponseDto> {
    if (query.title) {
      return this.categoryService.getCategoryBooksWithTitle(query, categoryId);
    }

    return this.categoryService.getCategoryBooks(query, categoryId);
  }
}
