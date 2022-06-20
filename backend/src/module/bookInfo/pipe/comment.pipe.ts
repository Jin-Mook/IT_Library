import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CommentDto } from '../dto/comment.dto';

@Injectable()
export class CommentPipe implements PipeTransform {
  transform(value: CommentDto, metadata: ArgumentMetadata): CommentDto {
    return {
      commentTitle: value.commentTitle,
      commentText: value.commentText,
      bookRating: +value.bookRating,
    };
  }
}
