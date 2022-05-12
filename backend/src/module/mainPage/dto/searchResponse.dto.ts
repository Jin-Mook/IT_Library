import { ResponseDto } from 'src/common/dto/common.dto';
import { BookInfoDto } from './books.dto';

export class SearchResponseDto extends ResponseDto {
  books: BookInfoDto[];
  maxPage: number;
}
