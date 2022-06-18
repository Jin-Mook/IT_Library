import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CommentParamsDto } from '../dto/commentParam.dto';

@Injectable()
export class CommentParamsPipe implements PipeTransform {
  transform(value: CommentParamsDto, metadata: ArgumentMetadata) {
    return {
      bookId: +value.bookId,
      commentId: +value.commentId,
    };
  }
}
