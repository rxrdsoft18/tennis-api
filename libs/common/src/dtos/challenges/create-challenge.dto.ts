import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

export class CreateChallengeDto {
  @IsNotEmpty()
  @IsDateString()
  dateAndTime: Date;

  @IsNotEmpty()
  requestPlayerId: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  // @ValidateNested({ each: true })
  @IsMongoId({ each: true })
  // @Type(() => EventDto)
  players: string[];
}
