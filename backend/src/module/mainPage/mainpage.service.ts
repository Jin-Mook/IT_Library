import { Injectable } from '@nestjs/common';
import { SearchResponseDto } from './dto/searchResponse.dto';
import { MainPageRepository } from './repository/mainpage.repository';

@Injectable()
export class MainpageService {
  constructor(private readonly mainpageRepository: MainPageRepository) {}

  // 메인페이지
  async getAllBooks() {
    const categories = await this.mainpageRepository.findAllCategories();
    const books = await this.mainpageRepository.findAllBooks();

    const result = {
      success: true,
      message: '책 정보 응답 성공',
      categories,
      rating: books[0],
      likeCount: books[1],
      newBook: books[2],
    };

    return result;
  }

  // 메인페이지 책 검색
  async findMainpageBooksWithTitle(
    title: string,
    view: number,
    page: number,
  ): Promise<SearchResponseDto> {
    const [books, maxCount] =
      await this.mainpageRepository.findMainpageBooksWithTitle(
        title,
        view,
        page,
      );

    const result: SearchResponseDto = {
      success: true,
      message: '책 검색 완료',
      books,
      maxPage: Math.ceil(maxCount / view),
      totalBookCount: maxCount,
    };

    return result;
  }
}
