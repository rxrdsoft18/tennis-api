import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  AnswerChallengeDto,
  AssignChallengeGameDto,
  CHALLENGES_SERVICE,
  CreateChallengeDto,
  GetChallengeDto,
  GetChallengePlayerDto,
  UpdateChallengeDto
} from "@app/common";
import { ClientProxy } from '@nestjs/microservices';
import { catchError, of, switchMap } from 'rxjs';

@Controller('v1/challenges')
export class ChallengesController {
  protected readonly logger = new Logger(ChallengesController.name);

  constructor(
    @Inject(CHALLENGES_SERVICE) private readonly challengesClient: ClientProxy,
  ) {}

  @Get()
  async findAll() {
    return this.challengesClient.send('all-challenges', {});
  }

  @Get(':id')
  async findById(@Param() getChallengeDto: GetChallengeDto) {
    return this.challengesClient
      .send('find-id-challenge', getChallengeDto)
      .pipe(
        switchMap((challenge) => of(challenge)),
        catchError((err) => {
          console.log(err, 'error');
          throw new BadRequestException(err.message);
        }),
      );
  }

  @Get('players/:id')
  async getChallengesByPlayerId(
    @Param() getChallengePlayerDto: GetChallengePlayerDto,
  ) {
    return this.challengesClient
      .send('challenges-by-player', getChallengePlayerDto)
      .pipe(
        switchMap((challenges) => of(challenges)),
        catchError((err) => {
          console.log(err, 'error');
          throw new BadRequestException(err.message);
        }),
      );
  }

  @Post()
  async create(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengesClient
      .send('create-challenge', createChallengeDto)
      .pipe(
        switchMap((challenge) => of(challenge)),
        catchError((err) => {
          console.log(err, 'error');
          throw new BadRequestException(err.message);
        }),
      );
  }

  @Patch(':id')
  async update(
    @Body() updateChallengeDto: UpdateChallengeDto,
    @Param() getChallengeDto: GetChallengeDto,
  ) {
    return this.challengesClient
      .send('update-challenge', {
        id: getChallengeDto.id,
        challenge: updateChallengeDto,
      })
      .pipe(
        switchMap((challenge) => of(challenge)),
        catchError((err) => {
          console.log(err, 'error');
          throw new BadRequestException(err.message);
        }),
      );
  }

  @Post(':id/answer')
  async answerChallenge(
    @Body() answerChallengeDto: AnswerChallengeDto,
    @Param() getChallengeDto: GetChallengeDto,
  ) {
    return this.challengesClient
      .send('answer-challenge', {
        id: getChallengeDto.id,
        challenge: answerChallengeDto,
      })
      .pipe(
        switchMap((challenge) => of(challenge)),
        catchError((err) => {
          console.log(err, 'error');
          throw new BadRequestException(err.message);
        }),
      );
  }

  @Post('/:id/game')
  async assignChallengeToGame(
    @Body() assignChallengeGame: AssignChallengeGameDto,
    @Param() getChallengeDto: GetChallengeDto,
  ) {
    return this.challengesClient
      .send('assign-challenge-game', {
        id: getChallengeDto.id,
        assignChallenge: assignChallengeGame,
      })
      .pipe(
        switchMap((challenge) => of(challenge)),
        catchError((err) => {
          console.log(err, 'error');
          throw new BadRequestException(err.message);
        }),
      );
  }

  @Delete(':id')
  async delete(@Param() getChallengeDto: GetChallengeDto) {
    return this.challengesClient.send('delete-challenge', getChallengeDto).pipe(
      switchMap((challenge) => of(challenge)),
      catchError((err) => {
        console.log(err, 'error');
        throw new BadRequestException(err.message);
      }),
    );
  }
}
