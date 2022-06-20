import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { SearchOrCategoryDto } from '../dto/searchOrCategory.dto';

@Injectable()
export class SearchOrCategoryPipe implements PipeTransform {
  transform(
    value: SearchOrCategoryDto,
    metadata: ArgumentMetadata,
  ): SearchOrCategoryDto {
    return {
      sortMethod:
        value.sortMethod && value.sortMethod <= 4 ? +value.sortMethod : 1,
      page: value.page ? +value.page : 1,
      view: value.view ? +value.view : 10,
      title: value?.title,
    };
  }
}
