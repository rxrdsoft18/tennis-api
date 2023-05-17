import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from '@app/common/dtos/aws/send-email.dto';
import { AwsSesConfig } from '@app/common/config/aws-ses.config';

@Injectable()
export class AwsSesService {
  protected readonly logger = new Logger(AwsSesService.name);
  private readonly client = new SESClient({
    region: this.awsSESConfig.AWS_REGION,
  });

  constructor(private readonly awsSESConfig: AwsSesConfig) {}

  async sendEmail(options: SendEmailDto) {
    const params = {
      Source: options.source,
      Destination: {
        ToAddresses: options.destination,
      },
      Message: {
        Subject: {
          Data: options.subject,
          Charset: 'utf-8',
        },
        Body: {
          Text: {
            Data: options.body,
            Charset: 'utf-8',
          },
        },
      },
    };

    try {
      await this.client.send(new SendEmailCommand(params));
    } catch (e) {
      this.logger.error(e.message);
    }
  }
}
