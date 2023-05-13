import { Ranking } from '@app/common/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';
import { BaseAbstractRepository } from './base/base.abstract.repository';

export class RankingsRepository extends BaseAbstractRepository<Ranking> {
  protected readonly logger = new Logger(RankingsRepository.name);
  constructor(
    @InjectModel(Ranking.name) private readonly playerModel: Model<Ranking>,
  ) {
    super(playerModel);
  }
}
