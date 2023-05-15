import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { AwsModule, BACKOFFICE_SERVICE, RabbitmqModule } from '@app/common';

@Module({
  imports: [
    RabbitmqModule.registerMmq({
      serviceName: BACKOFFICE_SERVICE,
      queue: 'BACKOFFICE',
    }),
    AwsModule,
  ],
  controllers: [PlayersController],
})
export class PlayersModule {}
