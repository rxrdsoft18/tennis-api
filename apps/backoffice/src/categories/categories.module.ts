import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import {
  CategoriesRepository,
  Category,
  CategorySchema,
  MongodbMongooseModule,
  Player,
  PlayerSchema,
  RabbitmqModule,
} from '@app/common';
@Module({
  imports: [
    MongodbMongooseModule,
    MongodbMongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Player.name,
        schema: PlayerSchema,
      },
    ]),
    RabbitmqModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
