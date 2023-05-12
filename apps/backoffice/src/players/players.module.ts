import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { PlayersRepository } from '@app/common/repositories/players.repository';
import {
  MongodbMongooseModule,
  Player,
  PlayerSchema,
  RabbitmqModule,
} from '@app/common';
import { CategoriesModule } from '../categories/categories.module';

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
    CategoriesModule,
  ],
  controllers: [PlayersController],
  providers: [PlayersService, PlayersRepository],
  exports: [PlayersService],
})
export class PlayersModule {}
