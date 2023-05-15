import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  BACKOFFICE_SERVICE,
  countBy,
  EventRanking,
  GameDto,
  GetRankingCategoryDto,
  groupBy,
  orderBy,
  Ranking,
  RankingsRepository,
  sumBy,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  HistoryGame,
  RankingResponse,
} from './interfaces/ranking-response.interface';

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

  async findByCategoryId(data: GetRankingCategoryDto) {
    console.log(data, ' ranking category');
    const rankingsResult = await this.rankingsRepository.find({});

    const groups = groupBy(rankingsResult, 'player');

    const rankings = Object.keys(groups).map((playerId) => {
      return {
        player: playerId,
        history: countBy(groups[playerId], 'event'),
        points: sumBy(groups[playerId], 'points'),
      };
    });

    const rankingsSort = orderBy(rankings, 'points', 'desc');

    const rankingResponseList: RankingResponse[] = [];

    rankingsSort.forEach((item, index) => {
      const rankingResponse: RankingResponse = {};
      rankingResponse.player = item.player;
      rankingResponse.position = index + 1;
      rankingResponse.points = item.points;

      const historyGames: HistoryGame = {};
      historyGames.victory = item.history[EventRanking.VICTORY] || 0;
      historyGames.defeat = item.history[EventRanking.DEFEAT] || 0;

      rankingResponse.historyGames = historyGames;

      rankingResponseList.push(rankingResponse);
    });

    return rankingResponseList;
  }
}
