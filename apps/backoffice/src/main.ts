import { NestFactory } from '@nestjs/core';
import { BackofficeModule } from './backoffice.module';
import { RabbitmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(BackofficeModule);
  const rabbitMQService = app.get(RabbitmqService);
  const configService = app.get(ConfigService);
  app.connectMicroservice(
    rabbitMQService.getRmqOptions(
      configService.get('RABBIT_MQ_BACKOFFICE_QUEUE'),
    ),
  );

  await app.startAllMicroservices();
}
bootstrap();
