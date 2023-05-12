import { Controller, Get } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import {
  AssignChallengeGameDto,
  CreateChallengeDto,
  RabbitmqService,
  UpdateChallengeDto,
} from '@app/common';

@Controller()
export class ChallengesController {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly rabbitMqService: RabbitmqService,
  ) {}

  @MessagePattern('all-challenges')
  async handleAll(@Ctx() ctx: RmqContext) {
    this.rabbitMqService.acknowledgeMessage(ctx);
    return this.challengesService.findAll();
  }

  @MessagePattern('find-id-challenge')
  async handleFindId(@Payload() data: { id: string }, @Ctx() ctx: RmqContext) {
    this.rabbitMqService.acknowledgeMessage(ctx);
    return this.challengesService.findById(data.id);
  }

  @MessagePattern('challenges-by-player')
  async handleChallengesByPlayer(
    @Payload() data: { id: string },
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitMqService.acknowledgeMessage(ctx);
    return this.challengesService.getChallengesByPlayerId(data.id);
  }

  @MessagePattern('create-challenge')
  async handleCreateChallenge(
    @Payload() data: CreateChallengeDto,
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitMqService.acknowledgeMessage(ctx);
    return this.challengesService.create(data);
  }

  @MessagePattern('update-challenge')
  async handleUpdateChallenge(
    @Payload() data: { id: string; challenge: UpdateChallengeDto },
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitMqService.acknowledgeMessage(ctx);
    return this.challengesService.update(data.id, data.challenge);
  }

  @MessagePattern('assign-challenge-game')
  async handleAssignChallengeGame(
    @Payload() data: { id: string; result: AssignChallengeGameDto },
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitMqService.acknowledgeMessage(ctx);
    return this.challengesService.assignChallengeToGame(data.id, data.result);
  }

  @MessagePattern('delete-challenge')
  async handleDeleteChallenge(
    @Payload() data: { id: string },
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitMqService.acknowledgeMessage(ctx);
    return this.challengesService.delete(data.id);
  }
}
