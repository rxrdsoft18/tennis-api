import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { PlayersRepository } from './players.repository';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(private readonly playerRepository: PlayersRepository) {}

  async findByEmail(email: string) {
    return this.playerRepository.findOne({ email });
  }

  async create(createPlayerDto: Readonly<CreatePlayerDto>) {
    const existsPlayer = await this.findByEmail(createPlayerDto.email);
    if (existsPlayer) {
      throw new ConflictException('User already exists with email');
    }

    return this.playerRepository.create({
      ...createPlayerDto,
      ranking: null,
      positionRanking: null,
      urlPhoto: null,
    });
  }

  async getAll() {
    return this.playerRepository.find({});
  }

  async findById(id: string) {
    const player = await this.playerRepository.findOne({ _id: id });

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return player;
  }

  async update(id: string, updatePlayerDto: Partial<UpdatePlayerDto>) {
    await this.findById(id);

    return this.playerRepository.findOneAndUpdate(
      {
        _id: id,
      },
      updatePlayerDto,
    );
  }

  async delete(id: string) {
    await this.findById(id);
    return this.playerRepository.findOneAndDelete({ _id: id });
  }
}
