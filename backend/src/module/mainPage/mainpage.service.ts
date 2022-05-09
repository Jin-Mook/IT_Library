import { Injectable } from '@nestjs/common';
import { MainPageRepository } from './repository/mainpage.repository';

@Injectable()
export class MainpageService {
  constructor(private readonly mainpageRepository: MainPageRepository) {}

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
}
