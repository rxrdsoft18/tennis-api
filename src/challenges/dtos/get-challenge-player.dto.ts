import { IsMongoId, IsString } from 'class-validator';

export class GetChallengePlayerDto {
  @IsString()
  @IsMongoId()
  id: string;
}
