import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { BACKOFFICE_SERVICE, RabbitmqModule } from '@app/common';
import { AwsModule } from '../aws/aws.module';

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
