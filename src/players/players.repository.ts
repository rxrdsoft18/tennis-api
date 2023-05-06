import { BaseAbstractRepository } from '../common/repositories/base.abstract.repository';
import { Player } from './schema/player.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PlayersRepository extends BaseAbstractRepository<Player> {
  protected readonly logger = new Logger(PlayersRepository.name);
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
  ) {
    super(playerModel);
  }
}
