import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { RankingsService } from './rankings.service';
import { ConfigModule } from '@nestjs/config';
import {
  BACKOFFICE_SERVICE,
  MongodbMongooseModule,
  Player,
  PlayerSchema,
  RabbitmqModule,
  Ranking,
  RankingSchema,
  RankingsRepository,
} from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/rankings/.env',
    }),
    RabbitmqModule,
    MongodbMongooseModule,
    MongodbMongooseModule.forFeature([
      {
        name: Ranking.name,
        schema: RankingSchema,
      },
      {
        name: Player.name,
        schema: PlayerSchema,
      },
    ]),
    RabbitmqModule.registerMmq({
      serviceName: BACKOFFICE_SERVICE,
      queue: 'BACKOFFICE',
    }),
  ],
  controllers: [RankingsController],
  providers: [RankingsService, RankingsRepository],
})
export class RankingsModule {}
