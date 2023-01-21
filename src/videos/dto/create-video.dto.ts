import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  'tittle': string;
  @IsNotEmpty()
  'description': string;
  @IsUrl()
  'source': string;
}
