import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { BACKOFFICE_SERVICE, RabbitmqModule } from '@app/common';

@Module({
  imports: [
    RabbitmqModule.registerMmq({
      serviceName: BACKOFFICE_SERVICE,
      queue: 'BACKOFFICE',
    }),
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
