import { Controller, Get } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { GetRankingCategoryDto, RabbitmqService } from '@app/common';

@Controller()
export class RankingsController {
  constructor(
    private readonly rankingsService: RankingsService,
    private readonly rabbitMqService: RabbitmqService,
  ) {}

  @EventPattern('process-game')
  async handleProcessorGame(@Payload() data: any, @Ctx() ctx: RmqContext) {
    this.rabbitMqService.acknowledgeMessage(ctx);
    await this.rankingsService.processGame(data);
  }

  @MessagePattern('find-rankings-category')
  async handleFindRankingsByCategory(
    @Payload() data: GetRankingCategoryDto,
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitMqService.acknowledgeMessage(ctx);
    return this.rankingsService.findByCategoryId(data);
  }
}
