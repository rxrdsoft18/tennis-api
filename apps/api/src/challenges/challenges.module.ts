import { Module } from '@nestjs/common';
import { ChallengesController } from './challenges.controller';
import { CHALLENGES_SERVICE, RabbitmqModule } from '@app/common';

@Module({
  imports: [
    RabbitmqModule.registerMmq({
      serviceName: CHALLENGES_SERVICE,
      queue: 'CHALLENGES',
    }),
  ],
  controllers: [ChallengesController],
})
export class ChallengesModule {}
