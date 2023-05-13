import { NestFactory } from '@nestjs/core';
import { RankingsModule } from './rankings.module';
import { RabbitmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(RankingsModule);
  const rabbitMqService = app.get(RabbitmqService);
  const configService = app.get(ConfigService);

  app.connectMicroservice(
    rabbitMqService.getRmqOptions(
      configService.get('RABBIT_MQ_RANKINGS_QUEUE'),
    ),
  );

  await app.startAllMicroservices();
}
bootstrap();
