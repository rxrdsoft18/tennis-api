import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class GetRankingCategoryDto {
  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  categoryId: string;
}
