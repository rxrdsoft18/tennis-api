import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {
  CategoriesRepository,
  Category,
  CategorySchema,
  MongodbMongooseModule,
  RabbitmqModule,
} from '@app/common';
import { PlayersModule } from '../players/players.module';
@Module({
  imports: [
    MongodbMongooseModule,
    MongodbMongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
    RabbitmqModule,
    // PlayersModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
