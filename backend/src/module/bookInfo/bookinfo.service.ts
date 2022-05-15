import { BookInfoRepository } from './repository/bookinfo.repository';
import { Injectable } from '@nestjs/common';
import { BookInfoResponseDto } from './dto/bookInfoResponse.dto';

@Injectable()
export class BookinfoService {
  constructor(private readonly bookInfoRepository: BookInfoRepository) {}

  async getBookInfo(bookId: number): Promise<BookInfoResponseDto> {
    const book = await this.bookInfoRepository.getBookInfo(bookId);
    const [bookComments, commentsCount] =
      await this.bookInfoRepository.getBookComments(bookId);

    const result: BookInfoResponseDto = {
      success: true,
      message: '책 상세페이지 전달 성공',
      book,
      bookComments,
      maxComment: Math.ceil(commentsCount / 10),
    };
    return result;
  }
}
