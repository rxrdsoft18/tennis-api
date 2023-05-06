import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Model, Types } from 'mongoose';
import { PlayersRepository } from './players.repository';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    private readonly playerRepository: PlayersRepository,
  ) {}

  async create(createPlayerDto: Readonly<CreatePlayerDto>) {
    return this.playerRepository.create(createPlayerDto);
  }

  async getAll() {
    return this.playerRepository.find({});
  }

  async findById(id: string) {
    return this.playerRepository.findOne({ _id: id });
  }

  async update(updatePlayerDto: Partial<UpdatePlayerDto>, id: string) {
    console.log(updatePlayerDto, ' update');
    console.log(id, ' player id');
  }

  async delete(id: string) {
    return {};
  }
}
