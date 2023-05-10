import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Put
} from "@nestjs/common";
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { GetChallengeDto } from './dtos/get-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { GetChallengePlayerDto } from './dtos/get-challenge-player.dto';
import { AssignChallengeGameDto } from "./dtos/assign-challenge-game.dto";

@Controller('v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  async findAll() {
    return this.challengesService.findAll();
  }

  @Get(':id')
  async findById(@Param() getChallengeDto: GetChallengeDto) {
    return this.challengesService.findById(getChallengeDto.id);
  }

  @Get('players/:id')
  async getChallengesByPlayerId(
    @Param() getChallengePlayerDto: GetChallengePlayerDto,
  ) {
    return this.challengesService.getChallengesByPlayerId(
      getChallengePlayerDto.id,
    );
  }

  @Post()
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengesService.create(createChallengeDto);
  }

  @Patch(':id')
  async update(
    @Body() updateChallengeDto: UpdateChallengeDto,
    @Param() getChallengeDto: GetChallengeDto,
  ) {
    return this.challengesService.update(
      getChallengeDto.id,
      updateChallengeDto,
    );
  }

  @Post('/:id/game')
  async assignChallengeToGame(
    @Body() assignChallengeGame: AssignChallengeGameDto,
    @Param() getChallengeDto: GetChallengeDto,
  ) {
    return this.challengesService.assignChallengeToGame(
      getChallengeDto.id,
      assignChallengeGame,
    );
  }

  @Delete(':id')
  async delete(@Param() getChallengeDto: GetChallengeDto) {
    return this.challengesService.delete(getChallengeDto.id);
  }
}
