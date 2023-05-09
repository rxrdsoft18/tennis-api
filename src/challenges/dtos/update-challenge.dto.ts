import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ChallengeStatus } from '../challenge-status.enum';

export class UpdateChallengeDto {
  @IsOptional()
  @IsDateString()
  dateAndTime?: Date;

  @IsOptional()
  @IsEnum(ChallengeStatus)
  @IsString()
  status?: ChallengeStatus;

  dateAndTimeResponse?: Date;
}
