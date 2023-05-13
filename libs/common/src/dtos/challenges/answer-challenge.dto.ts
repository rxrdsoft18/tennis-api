import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ChallengeStatus } from '@app/common/constants/challenge-status.enum';

export class AnswerChallengeDto {
  @IsOptional()
  @IsEnum(ChallengeStatus)
  @IsString()
  status?: ChallengeStatus;
}
