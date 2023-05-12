import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ChallengeStatus } from '@app/common/constants/challenge-status.enum';

// export enum ChallengeStatus {
//   DONE = 'DONE',
//   PENDING = 'PENDING',
//   ACCEPTED = 'ACCEPTED',
//   REJECTED = 'REJECTED',
//   CANCELED = 'CANCELED',
// }

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
