import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { convert } from 'url-slug';

@Injectable()
export class SlugPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return convert(value); //se implementa slug hola-mundo-etc
  }
}
