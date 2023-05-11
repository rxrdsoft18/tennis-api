import { Injectable } from '@nestjs/common';
import { PlayersRepository } from '@app/common/repositories/players.repository';
import { CreatePlayerDto, UpdatePlayerDto } from '@app/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PlayersService {
  constructor(private readonly playersRepository: PlayersRepository) {}

  async findByEmail(email: string) {
    return this.playersRepository.findOne({ email });
  }

  async create(createPlayerDto: Readonly<CreatePlayerDto>) {
    const existsPlayer = await this.findByEmail(createPlayerDto.email);
    if (existsPlayer) {
      throw new RpcException('User already exists with email');
    }

    return this.playersRepository.create({
      ...createPlayerDto,
      ranking: null,
      positionRanking: null,
      urlPhoto: null,
    });
  }

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

  async update(id: string, updatePlayerDto: Partial<UpdatePlayerDto>) {
    await this.findById(id);

    return this.playersRepository.findOneAndUpdate(
      {
        _id: id,
      },
      updatePlayerDto,
    );
  }

  async delete(id: string) {
    await this.findById(id);
    return this.playersRepository.findOneAndDelete({ _id: id });
  }
}
