import { ChallengeStatus } from '../challenge-status.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AnswerChallengeDto {
  @IsNotEmpty()
  @IsEnum(ChallengeStatus)
  @IsString()
  status: ChallengeStatus;
}
