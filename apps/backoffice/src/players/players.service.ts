import { Injectable } from '@nestjs/common';
import { PlayersRepository } from '@app/common/repositories/players.repository';
import { CreatePlayerDto, UpdatePlayerDto } from '@app/common';
import { RpcException } from '@nestjs/microservices';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class PlayersService {
  constructor(
    private readonly playersRepository: PlayersRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  async findAll() {
    return this.playersRepository.find({});
  }
  async findById(id: string) {
    const player = await this.playersRepository.findOne({ _id: id });

    if (!player) {
      throw new RpcException(`Player with ID ${id} not found`);
    }

    return player;
  }
  async findByEmail(email: string) {
    return this.playersRepository.findOne({ email });
  }

  private async validCreatePlayer(createPlayerDto: CreatePlayerDto) {
    const existsPlayer = await this.findByEmail(createPlayerDto.email);
    if (existsPlayer) {
      throw new RpcException('User already exists with email');
    }
    await this.validCategory(createPlayerDto.category);
  }

  private async validCategory(category: string) {
    if (category) {
      await this.categoriesService.findById(category);
    }
  }

  async create(createPlayerDto: Readonly<CreatePlayerDto>) {
    await this.validCreatePlayer(createPlayerDto);
    return this.playersRepository.create({
      ...createPlayerDto,
      ranking: null,
      positionRanking: null,
      urlPhoto: null,
    });
  }

  async update(id: string, updatePlayerDto: Partial<UpdatePlayerDto>) {
    await this.findById(id);
    await this.validCategory(updatePlayerDto.category);
    return this.playersRepository.findOneAndUpdate(
      {
        _id: id,
      },
      updatePlayerDto,
    );
  }

  async categoryByPlayerId(id: string) {
    const player = await this.playersRepository
      .findOne({ _id: id })
      .populate('category');

    if (!player.category) {
      throw new RpcException(
        `There is no category associated with a player Id: ${id}`,
      );
    }
    return player;
  }

  async delete(id: string) {
    await this.findById(id);
    return this.playersRepository.findOneAndDelete({ _id: id });
  }
}
