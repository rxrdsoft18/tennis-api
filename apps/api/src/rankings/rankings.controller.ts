import { Controller, Get, Inject, Param } from '@nestjs/common';
import { GetRankingCategoryDto, RANKINGS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('v1/rankings')
export class RankingsController {
  constructor(
    @Inject(RANKINGS_SERVICE) private readonly rankingsClient: ClientProxy,
  ) {}

  @Get(':categoryId')
  async findByCategory(@Param() getRankingCategoryDto: GetRankingCategoryDto) {
    return this.rankingsClient.send(
      'find-rankings-category',
      getRankingCategoryDto,
    );
  }
}
