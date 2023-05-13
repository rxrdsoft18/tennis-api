import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AnswerChallengeDto,
  AssignChallengeGameDto,
  BACKOFFICE_SERVICE,
  ChallengesRepository,
  CreateChallengeDto,
  GameDto,
  GamesRepository,
  RANKINGS_SERVICE,
  UpdateChallengeDto,
} from '@app/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ChallengeStatus } from '@app/common/constants/challenge-status.enum';
import { firstValueFrom } from 'rxjs';
import { IGame } from '@app/common/interfaces/game.interface';

@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);
  constructor(
    private readonly challengesRepository: ChallengesRepository,
    private readonly gamesRepository: GamesRepository,
    @Inject(BACKOFFICE_SERVICE) private readonly backofficeClient: ClientProxy,
    @Inject(RANKINGS_SERVICE) private readonly rankingsClient: ClientProxy,
  ) {}
  async findById(id: string) {
    const challenge = await this.challengesRepository
      .findOne({ _id: id })
      .populate('requestPlayer')
      .populate('game');

    if (!challenge) {
      throw new RpcException('No exists challenge');
    }
    return challenge;
  }

  async getChallengesByPlayerId(playerId: string) {
    return this.challengesRepository
      .find({})
      .where('players')
      .in([playerId])
      .populate('players')
      .populate('game');
  }

  async findAll() {
    return this.challengesRepository
      .find({})
      .populate('players')
      .populate('requestPlayer')
      .populate('game');
  }
  private async validExistByPlayerId(playerId: string) {
    await firstValueFrom(
      this.backofficeClient.send('find-id-player', { id: playerId }),
    ).catch((err) => {
      throw new RpcException(err.message);
    });
  }

  private async validExistsPlayers(players: string[]) {
    for (const player of players) {
      await this.validExistByPlayerId(player);
    }
  }

  private async validIfRequestPlayerContainsInPlayers(
    requestPlayerId: string,
    players: string[],
  ) {
    return players.includes(requestPlayerId);
  }

  private async validRequestPlayerId(requestPlayerId: string) {
    await this.validExistByPlayerId(requestPlayerId);
  }

  private async validateCreateChallenge(
    createChallengeDto: CreateChallengeDto,
  ) {
    const { requestPlayerId, players } = createChallengeDto;
    await this.validExistsPlayers(players);
    const containsPlayerId = await this.validIfRequestPlayerContainsInPlayers(
      requestPlayerId,
      players,
    );

    if (!containsPlayerId) {
      throw new RpcException('Request playerId must be in the player list');
    }
    await this.validRequestPlayerId(requestPlayerId);
  }

  async create(createChallengeDto: Readonly<CreateChallengeDto>) {
    const { requestPlayerId } = createChallengeDto;
    await this.validateCreateChallenge(createChallengeDto);

    const categoryPlayer = await firstValueFrom(
      this.backofficeClient.send('get-category-player', {
        id: requestPlayerId,
      }),
    ).catch((err) => {
      throw new RpcException(err.message);
    });

    return this.challengesRepository.create({
      ...createChallengeDto,
      status: ChallengeStatus.PENDING,
      dateAndTimeResponse: null,
      requestPlayer: requestPlayerId,
      category: categoryPlayer.category._id,
      game: null,
    });
  }

  async update(id: string, updateChallengeDto: Partial<UpdateChallengeDto>) {
    await this.findById(id);

    return this.challengesRepository.findOneAndUpdate(
      { _id: id },
      updateChallengeDto,
    );
  }

  async answerChallenge(id: string, answerChallengeDto: AnswerChallengeDto) {
    const challenge = await this.findById(id);

    if (challenge.status !== ChallengeStatus.PENDING) {
      throw new RpcException(
        'Only challenges with a PENDING status can be updated!',
      );
    }

    return this.challengesRepository.findOneAndUpdate(
      { _id: id },
      {
        status: answerChallengeDto.status,
        dateAndTimeResponse: new Date(),
      },
    );
  }

  async assignChallengeToGame(
    id: string,
    assignChallengeGame: AssignChallengeGameDto,
  ) {
    console.log(assignChallengeGame, 'assign challenge');
    const challenge = await this.findById(id);

    if (challenge.status === ChallengeStatus.DONE) {
      throw new RpcException('challenge already done');
    }

    if (challenge.status !== ChallengeStatus.ACCEPTED) {
      throw new RpcException(
        'Matches can only be started on challenges accepted by opponents!',
      );
    }

    const game: GameDto = {
      result: assignChallengeGame.result,
      players: challenge.players,
      category: challenge.category,
      challenge: id,
      winnerPlayerId: assignChallengeGame.winnerPlayerId,
    };

    const gameCreated = await this.gamesRepository.create(game);

    challenge.status = ChallengeStatus.DONE;
    challenge.game = gameCreated;

    try {
      const challengeUpdate = await this.challengesRepository.findOneAndUpdate(
        { _id: id },
        challenge,
      );
      this.rankingsClient.emit('process-game', {
        id: gameCreated._id,
        game,
      });
      return challengeUpdate;
    } catch (e) {
      await this.gamesRepository.findOneAndDelete({ _id: gameCreated._id });
      throw new RpcException('Error assign challenge to game');
    }
  }

  async delete(id: string) {
    await this.findById(id);
    return this.challengesRepository.findOneAndUpdate(
      { _id: id },
      {
        status: ChallengeStatus.CANCELED,
      },
    );
  }
}
