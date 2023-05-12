import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { ChallengesService } from './challenges.service';
import {
  BACKOFFICE_SERVICE,
  Challenge,
  ChallengeSchema,
  ChallengesRepository,
  Game,
  GameSchema,
  GamesRepository,
  MongodbMongooseModule, Player, PlayerSchema,
  RabbitmqModule
} from "@app/common";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/challenges/.env',
    }),
    RabbitmqModule,
    MongodbMongooseModule,
    MongodbMongooseModule.forFeature([
      {
        name: Challenge.name,
        schema: ChallengeSchema,
      },
      {
        name: Game.name,
        schema: GameSchema,
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
  controllers: [ChallengesController],
  providers: [ChallengesService, ChallengesRepository, GamesRepository],
})
export class ChallengesModule {}
