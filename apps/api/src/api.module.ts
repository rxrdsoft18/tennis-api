import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from '@app/common';
import { BACKOFFICE_SERVICE } from '@app/common';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api/.env',
    }),

    CategoriesModule,
  ],
  controllers: [ApiController],
  providers: [],
})
export class ApiModule {}
