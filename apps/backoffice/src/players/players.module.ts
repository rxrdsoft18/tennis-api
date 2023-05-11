import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { PlayersRepository } from '@app/common/repositories/players.repository';
import {
  Category,
  CategorySchema,
  MongodbMongooseModule,
  Player,
  PlayerSchema,
  RabbitmqModule,
} from '@app/common';

@Module({
  imports: [
    MongodbMongooseModule,
    MongodbMongooseModule.forFeature([
      {
        name: Player.name,
        schema: PlayerSchema,
      },
    ]),
    RabbitmqModule,
  ],
  controllers: [PlayersController],
  providers: [PlayersService, PlayersRepository],
})
export class PlayersModule {}
