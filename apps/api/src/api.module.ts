import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from '@app/common';
import { BACKOFFICE_SERVICE } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api/.env',
    }),
    RabbitmqModule.registerMmq({
      serviceName: BACKOFFICE_SERVICE,
      queue: process.env.RABBIT_MQ_BACKOFFICE_QUEUE,
    }),
  ],
  controllers: [ApiController],
  providers: [],
})
export class ApiModule {}
