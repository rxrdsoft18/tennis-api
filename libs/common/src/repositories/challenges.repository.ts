import { Challenge } from '@app/common/schemas';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class ChallengesRepository extends BaseAbstractRepository<Challenge> {
  protected readonly logger = new Logger(ChallengesRepository.name);

  constructor(
    @InjectModel(Challenge.name)
    private readonly challengeModel: Model<Challenge>,
  ) {
    super(challengeModel);
  }
}
