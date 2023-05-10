import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  constructor(private readonly configService: ConfigService) {}
  getRmqOptions(queue: string, noAck = false): RmqOptions {
    const RABBITMQ_URI = this.configService.get('RABBITMQ_URI');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URI],
        noAck,
        queue,
        queueOptions: {
          durable: true,
        },
      },
    };
  }

  acknowledgeMessage(context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
