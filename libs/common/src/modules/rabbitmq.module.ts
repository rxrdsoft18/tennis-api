import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RabbitmqService } from '@app/common/services/rabbitmq.service';

interface RqmModuleOptions {
  serviceName: string;
  queue: string;
}

@Module({
  imports: [],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {
  static registerMmq(options: RqmModuleOptions): DynamicModule {
    return {
      module: RabbitmqModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: options.serviceName,
            useFactory: (configService: ConfigService) => {
              const RABBITMQ_URI = configService.get('RABBITMQ_URI');
              return {
                transport: Transport.RMQ,
                options: {
                  urls: [RABBITMQ_URI],
                  queue: options.queue,
                },
              };
            },
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
