import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SearchOrCategoryDto } from 'src/common/dto/searchOrCategory.dto';
import { SearchOrCategoryPipe } from 'src/common/pipe/searchOrCategory.pipe';
import { SearchResponseDto } from '../mainPage/dto/searchResponse.dto';
import { CategoryService } from './category.service';

@Controller('/api/category/:categoryId')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategorypageBooks(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query(SearchOrCategoryPipe) query: SearchOrCategoryDto,
  ): Promise<SearchResponseDto> {
    if (query.title) {
      return this.categoryService.getCategoryBooksWithTitle(query, categoryId);
    }

    return this.categoryService.getCategoryBooks(query, categoryId);
  }
}
