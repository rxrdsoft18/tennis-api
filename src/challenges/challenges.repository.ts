import { BaseAbstractRepository } from '../common/repositories/base.abstract.repository';
import { Challenge } from './schemas/challenge.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChallengesRepository extends BaseAbstractRepository<Challenge> {
  protected readonly logger = new Logger(ChallengesRepository.name);

  constructor(
    @InjectModel(Challenge.name) private readonly challengeModel: Model<Challenge>,
  ) {
    super(challengeModel);
  }
}
