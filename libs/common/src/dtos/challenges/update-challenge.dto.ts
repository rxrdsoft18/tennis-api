import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class UpdateChallengeDto {
  @IsOptional()
  @IsDateString()
  dateAndTime?: Date;

  @IsNotEmpty()
  @IsOptional()
  @IsMongoId()
  category?: string;
}
