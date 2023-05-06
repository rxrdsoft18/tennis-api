import { IsMongoId, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetPlayerDto {
  @IsString()
  @IsMongoId()
  id: string;
}
