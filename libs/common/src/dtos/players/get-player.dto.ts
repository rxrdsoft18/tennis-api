import { IsMongoId, IsString } from 'class-validator';

export class GetPlayerDto {
  @IsString()
  @IsMongoId()
  id: string;
}
