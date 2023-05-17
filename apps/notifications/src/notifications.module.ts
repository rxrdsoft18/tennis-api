import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { AwsSesModule, BACKOFFICE_SERVICE, RabbitmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/notifications/.env',
    }),
    RabbitmqModule,
    RabbitmqModule.registerMmq({
      serviceName: BACKOFFICE_SERVICE,
      queue: 'BACKOFFICE',
    }),
    AwsSesModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
