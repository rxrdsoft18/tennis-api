import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateChallengeDto, RabbitmqService } from "@app/common";

@Controller()
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly rabbitMqService: RabbitmqService,
  ) {}

  @EventPattern('created-challenge')
  async handleCreatedChallenge(@Payload() data: CreateChallengeDto, @Ctx() ctx: RmqContext) {
    this.rabbitMqService.acknowledgeMessage(ctx);
    await this.notificationsService.sendEmailOpponent(data);
  }
}
