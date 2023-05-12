import { Game } from '@app/common/schemas';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseAbstractRepository } from './base/base.abstract.repository';

@Injectable()
export class GamesRepository extends BaseAbstractRepository<Game> {
  protected readonly logger = new Logger(GamesRepository.name);

  constructor(
    @InjectModel(Game.name)
    private readonly gameModel: Model<Game>,
  ) {
    super(gameModel);
  }
}
