import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  BACKOFFICE_SERVICE,
  CreateChallengeDto,
  SendEmailDto,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AwsSesService } from '@app/common/services/aws-ses.service';

@Injectable()
export class NotificationsService {
  protected readonly logger = new Logger(NotificationsService.name);
  constructor(
    @Inject(BACKOFFICE_SERVICE) private readonly backofficeClient: ClientProxy,
    private readonly sesService: AwsSesService,
  ) {}
  async sendEmailOpponent(data: CreateChallengeDto) {
    console.log('send email opponent');
    const opponentPlayerId = data.players.find(
      (player) => player !== data.requestPlayerId,
    );

    const opponentPlayer = await firstValueFrom(
      this.backofficeClient.send('find-id-player', { id: opponentPlayerId }),
    ).catch((err) => {
      this.logger.error(err.message);
    });

    const requestPlayer = await firstValueFrom(
      this.backofficeClient.send('find-id-player', {
        id: data.requestPlayerId,
      }),
    ).catch((err) => {
      this.logger.error(err.message);
    });


    const options: SendEmailDto = {
      source: 'rxrdsoft@gmail.com',
      destination: ['rxrdsoft@gmail.com'],
      subject: 'You have a new challenge!!!',
      body: `Your opponent is: ${opponentPlayer.name}`,
    };

    await this.sesService.sendEmail(options);
  }
}
