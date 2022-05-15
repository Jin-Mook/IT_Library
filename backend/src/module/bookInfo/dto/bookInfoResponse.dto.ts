import { ResponseDto } from 'src/common/dto/common.dto';
import { BookCommentsEntity } from 'src/entity/bookComments.entity';
import { BooksEntity } from 'src/entity/books.entity';

export class BookInfoResponseDto extends ResponseDto {
  book: BooksEntity;
  bookComments: BookCommentsEntity[];
  maxComment: number;
}
