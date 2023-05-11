import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { BACKOFFICE_SERVICE, RabbitmqModule } from '@app/common';

@Module({
  imports: [
    RabbitmqModule.registerMmq({
      serviceName: BACKOFFICE_SERVICE,
      queue: 'BACKOFFICE',
    }),
  ],
  controllers: [PlayersController],
})
export class PlayersModule {}
