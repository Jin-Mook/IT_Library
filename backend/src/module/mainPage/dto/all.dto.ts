import { ResponseDto } from 'src/common/dto/common.dto';

export class AllDto extends ResponseDto {
  categories: object;
  rating: object;
  likeCount: object;
  newBook: object;
}
