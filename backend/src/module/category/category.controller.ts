import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryPipe } from './pipe/category.pipe';

@Controller('/api/category/:categoryId')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategorypageBooks(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query(CategoryPipe) query,
  ) {
    return this.categoryService.getCategoryBooks(query, categoryId);
  }
}
