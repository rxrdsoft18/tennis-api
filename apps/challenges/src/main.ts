import { NestFactory } from '@nestjs/core';
import { ChallengesModule } from './challenges.module';
import { RabbitmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ChallengesModule);
  const rabbitMmqService = app.get(RabbitmqService);
  const configService = app.get(ConfigService);
  app.connectMicroservice(
    rabbitMmqService.getRmqOptions(
      configService.get('RABBIT_MQ_CHALLENGES_QUEUE'),
    ),
  );

  await app.startAllMicroservices();
}
bootstrap();
