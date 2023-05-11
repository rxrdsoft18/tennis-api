import { BaseAbstractRepository, Player } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

export class PlayersRepository extends BaseAbstractRepository<Player> {
  protected readonly logger = new Logger(PlayersRepository.name);
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<Player>,
  ) {
    super(playerModel);
  }
}
