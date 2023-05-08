import { IsMongoId, IsString } from 'class-validator';

export class AssignPlayerCategoryDto {
  @IsString()
  @IsMongoId()
  id: string;

  @IsString()
  @IsMongoId()
  playerId: string;
}
