import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { GetPlayerDto } from './dtos/get-player.dto';

@Controller('v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getAll() {
    return this.playersService.getAll();
  }

  @Get(':id')
  async findById(@Param() getPlayerDto: GetPlayerDto) {
    return this.playersService.findById(getPlayerDto.id);
  }

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Patch(':id')
  async update(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param() getPlayerDto: GetPlayerDto,
  ) {
    return this.playersService.update(updatePlayerDto, getPlayerDto.id);
  }

  @Delete(':id')
  async delete(@Param() getPlayerDto: GetPlayerDto) {
    return this.playersService.delete(getPlayerDto.id);
  }
}
