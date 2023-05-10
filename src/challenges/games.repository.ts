import { BaseAbstractRepository } from '../common/repositories/base.abstract.repository';
import { Game } from './schemas/game.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class GamesRepository extends BaseAbstractRepository<Game> {
  protected readonly logger = new Logger(GamesRepository.name);
  constructor(@InjectModel(Game.name) private readonly gameModel: Model<Game>) {
    super(gameModel);
  }
}
