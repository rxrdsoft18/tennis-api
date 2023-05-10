import { Controller, Logger, UseFilters } from "@nestjs/common";
import { ExceptionFilter, RabbitmqService } from "@app/common";
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CategoriesService } from './categories.service';

@Controller()
export class CategoriesController {
  protected readonly logger = new Logger(CategoriesController.name);
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  @MessagePattern('all-categories')
  async handleAllCategories(@Payload() data: any, @Ctx() ctx: RmqContext) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.categoriesService.findAll();
  }

  @MessagePattern('find-id-category')
  async handleCategory(@Payload() data: any, @Ctx() ctx: RmqContext) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.categoriesService.findAll();
  }

  // @UseFilters(new ExceptionFilter())
  @MessagePattern('create-category')
  async handleCreateCategory(@Payload() data: any, @Ctx() ctx: RmqContext) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    try {
      return this.categoriesService.create(data);
    } catch (e) {
      console.log(e, 'ERROR CATEGORY BACKOFFICE');
    }
  }
}
