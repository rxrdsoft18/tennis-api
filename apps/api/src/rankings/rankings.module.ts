import { Module } from '@nestjs/common';
import { RankingsController } from './rankings.controller';
import { RabbitmqModule, RANKINGS_SERVICE } from '@app/common';

@Module({
  imports: [
    RabbitmqModule.registerMmq({
      serviceName: RANKINGS_SERVICE,
      queue: 'RANKINGS',
    }),
  ],
  controllers: [RankingsController],
})
export class RankingsModule {}
