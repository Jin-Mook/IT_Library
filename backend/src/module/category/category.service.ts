import { Injectable } from '@nestjs/common';
import { SearchResponseDto } from '../mainPage/dto/searchResponse.dto';
import { CategoryDto } from './dto/category.dto';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategoryBooks(
    query: CategoryDto,
    categoryId: number,
  ): Promise<SearchResponseDto> {
    const booksResult = await this.categoryRepository.findCategoryBooks(
      query.sortMethod,
      query.page,
      query.view,
      categoryId,
    );

    return {
      success: true,
      message: '책 정보 전달 완료',
      books: booksResult[0],
      maxPage: Math.ceil(booksResult[1] / query.view),
    };
  }
}
