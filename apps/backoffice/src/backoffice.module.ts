import { Module } from '@nestjs/common';
import { BackofficeController } from './backoffice.controller';
import { BackofficeService } from './backoffice.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/backoffice/.env',
    }),
    // RabbitmqModule,
    CategoriesModule,
    PlayersModule,
  ],
  controllers: [BackofficeController],
  providers: [BackofficeService],
})
export class BackofficeModule {}
