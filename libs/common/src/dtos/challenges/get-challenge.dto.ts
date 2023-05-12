import { IsMongoId, IsString } from 'class-validator';

export class GetChallengeDto {
  @IsString()
  @IsMongoId()
  id: string;
}
