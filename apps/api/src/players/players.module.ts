import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { AwsS3Module, BACKOFFICE_SERVICE, RabbitmqModule } from "@app/common";

@Module({
  imports: [
    RabbitmqModule.registerMmq({
      serviceName: BACKOFFICE_SERVICE,
      queue: 'BACKOFFICE',
    }),
    AwsS3Module,
  ],
  controllers: [PlayersController],
})
export class PlayersModule {}
