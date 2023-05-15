import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { RabbitmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const rabbitMqService = app.get(RabbitmqService);
  const configService = app.get(ConfigService);

  app.connectMicroservice(
    rabbitMqService.getRmqOptions(
      configService.get('RABBIT_MQ_NOTIFICATIONS_QUEUE'),
    ),
  );

  await app.startAllMicroservices();
}
bootstrap();
