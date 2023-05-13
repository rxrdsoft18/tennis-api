import { Controller, Get, Inject } from '@nestjs/common';
import { RANKINGS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('v1/rankings')
export class RankingsController {
  constructor(
    @Inject(RANKINGS_SERVICE) private readonly rankingsClient: ClientProxy,
  ) {}

  @Get()
  async findAll() {
    return this.rankingsClient.send('find-rankings', {});
  }
}
