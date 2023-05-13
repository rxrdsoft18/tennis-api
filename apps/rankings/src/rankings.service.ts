import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  BACKOFFICE_SERVICE,
  EventRanking,
  GameDto,
  Ranking,
  RankingsRepository,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RankingsService {
  protected readonly logger = new Logger(RankingsService.name);

  constructor(
    private readonly rankingsRepository: RankingsRepository,
    @Inject(BACKOFFICE_SERVICE) private readonly backofficeClient: ClientProxy,
  ) {}
  async processGame(data: Readonly<{ id: string; game: GameDto }>) {
    const { id, game } = data;

    const category = await firstValueFrom(
      this.backofficeClient.send('find-id-category', {
        id: game.category,
      }),
    ).catch((err) => {
      console.log(err.message);
    });

    await Promise.all(
      game.players.map(async (player) => {
        const ranking = new Ranking();

        ranking.category = game.category;
        ranking.challenge = game.challenge;
        ranking.game = id;
        ranking.player = player;

        if (player == game.winnerPlayerId) {
          const event = category.events.find(
            (event) => event.name == EventRanking.VICTORY,
          );
          ranking.event = event.name;
          ranking.operation = event.operation;
          ranking.points = event.value;
        } else {
          const event = category.events.find(
            (event) => event.name == EventRanking.DEFEAT,
          );

          ranking.event = event.name;
          ranking.operation = event.operation;
          ranking.points = event.value;
        }

        this.logger.log(`ranking: ${JSON.stringify(ranking)}`);

        await this.rankingsRepository.create(ranking);
      }),
    );
  }

  async findAll() {
    return this.rankingsRepository.find({}).populate('player');
  }
}
