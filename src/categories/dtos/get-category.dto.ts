import { IsMongoId, IsString } from 'class-validator';

export class GetCategoryDto {
  @IsString()
  @IsMongoId()
  id: string;
}
