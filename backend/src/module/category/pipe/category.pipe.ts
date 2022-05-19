import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryPipe implements PipeTransform {
  transform(value: CategoryDto, metadata: ArgumentMetadata): CategoryDto {
    return {
      sortMethod:
        value.sortMethod && value.sortMethod <= 4 ? +value.sortMethod : 1,
      page: value.page ? +value.page : 1,
      view: value.view ? +value.view : 10,
      title: value?.title,
    };
  }
}
