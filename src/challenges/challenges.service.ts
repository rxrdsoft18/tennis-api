import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { ChallengesRepository } from './challenges.repository';
import { ChallengeStatus } from './challenge-status.enum';
import { PlayersService } from '../players/players.service';
import { CategoriesService } from '../categories/categories.service';
import { AssignChallengeGameDto } from './dtos/assign-challenge-game.dto';
import { GamesRepository } from './games.repository';

@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);
  constructor(
    private readonly challengesRepository: ChallengesRepository,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
    private readonly gamesRepository: GamesRepository,
  ) {}
  async findById(id: string) {
    const challenge = await this.challengesRepository
      .findOne({ _id: id })
      .populate('players')
      .populate('requestPlayer')
      .populate('game');

    if (!challenge) {
      throw new NotFoundException('No exists challenge');
    }
    return challenge;
  }

  async getChallengesByPlayerId(playerId: string) {
    await this.playersService.findById(playerId);
    return this.challengesRepository
      .find({})
      .where('players')
      .in([playerId])
      .populate('players')
      .populate('requestPlayer')
      .populate('game');
  }

  async findAll() {
    return this.challengesRepository
      .find({})
      .populate('players')
      .populate('requestPlayer')
      .populate('game');
  }
  private async validExistsPlayers(players: string[]) {
    for (const player of players) {
      await this.playersService.findById(player);
    }
  }

  private async validIfRequestPlayerContainsInPlayers(
    requestPlayerId: string,
    players: string[],
  ) {
    return players.includes(requestPlayerId);
  }

  private async validRequestPlayerId(requestPlayerId: string) {
    await this.playersService.findById(requestPlayerId);
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
      throw new BadRequestException(
        'Request playerId must be in the player list',
      );
    }
    await this.validRequestPlayerId(requestPlayerId);
  }

  async create(createChallengeDto: Readonly<CreateChallengeDto>) {
    const { requestPlayerId } = createChallengeDto;
    await this.validateCreateChallenge(createChallengeDto);

    const categoryPlayer = await this.categoriesService.categoryByPlayerId(
      requestPlayerId,
    );

    return this.challengesRepository.create({
      ...createChallengeDto,
      status: ChallengeStatus.PENDING,
      dateAndTimeResponse: null,
      requestPlayer: requestPlayerId,
      category: categoryPlayer.name,
      game: null,
    });
  }

  async update(id: string, updateChallengeDto: Partial<UpdateChallengeDto>) {
    await this.findById(id);

    if (updateChallengeDto.status) {
      updateChallengeDto.dateAndTimeResponse = new Date();
    }

    return this.challengesRepository.findOneAndUpdate(
      { _id: id },
      updateChallengeDto,
    );
  }

  async assignChallengeToGame(
    id: string,
    assignChallengeGame: AssignChallengeGameDto,
  ) {
    console.log(assignChallengeGame, 'assign challenge');
    const challenge = await this.findById(id);
    const game = await this.gamesRepository.create({
      result: assignChallengeGame.result,
      players: challenge.players,
      category: challenge.category,
    });

    challenge.status = ChallengeStatus.DONE;
    challenge.game = game;

    try {
      await this.challengesRepository.findOneAndUpdate({ _id: id }, challenge);
    } catch (e) {
      await this.gamesRepository.findOneAndDelete({ _id: game._id });
      throw new InternalServerErrorException();
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
