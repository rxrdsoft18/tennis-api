import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AssignChallengeGameDto {
  @IsNotEmpty({ each: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Result)
  result: Result[];

  @IsNotEmpty()
  @IsMongoId()
  @IsString()
  winnerPlayerId: string;
}

export class Result {
  @IsNotEmpty()
  @IsString()
  set: string;
}
