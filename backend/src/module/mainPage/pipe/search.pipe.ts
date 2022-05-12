import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { SearchDto } from '../dto/search.dto';

@Injectable()
export class SearchPipe implements PipeTransform {
  transform(value: SearchDto, metadata: ArgumentMetadata) {
    return {
      title: value.title,
      view: +value.view,
      page: value.page ? +value.page : 1,
    };
  }
}
