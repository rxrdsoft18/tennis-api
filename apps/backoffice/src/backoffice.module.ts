import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/backoffice/.env',
    }),
    CategoriesModule,
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class BackofficeModule {}
