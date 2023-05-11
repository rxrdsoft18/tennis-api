import { Controller } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto, RabbitmqService, UpdatePlayerDto } from '@app/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class PlayersController {
  constructor(
    private readonly playersService: PlayersService,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  @MessagePattern('all-players')
  async handleAllPlayers(@Payload() data: any, @Ctx() ctx: RmqContext) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.playersService.findAll();
  }

  @MessagePattern('find-id-player')
  async handleFindIdPlayer(
    @Payload() data: { id: string },
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.playersService.findById(data.id);
  }

  @MessagePattern('create-player')
  async handleCreatePlayer(
    @Payload() data: CreatePlayerDto,
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.playersService.create(data);
  }

  @MessagePattern('update-player')
  async handleUpdatePlayer(
    @Payload() data: { id: string; player: UpdatePlayerDto },
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.playersService.update(data.id, data.player);
  }

  @MessagePattern('delete-player')
  async handleDeletePlayer(
    @Payload() data: { id: string },
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.playersService.delete(data.id);
  }
}
