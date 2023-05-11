import { Controller, Logger, UseFilters } from '@nestjs/common';
import { ExceptionFilter, RabbitmqService } from '@app/common';
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
    return this.categoriesService.findById(data.id);
  }

  @MessagePattern('create-category')
  async handleCreateCategory(@Payload() data: any, @Ctx() ctx: RmqContext) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.categoriesService.create(data);
  }

  @MessagePattern('update-category')
  async handleUpdateCategory(@Payload() data: any, @Ctx() ctx: RmqContext) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.categoriesService.update(data.id, data.category);
  }

  @MessagePattern('assign-player-category')
  async handleAssignPlayerCategory(
    @Payload() data: any,
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.categoriesService.assignPlayerToCategory(data);
  }

  @MessagePattern('delete-category')
  async handleDeleteCategory(@Payload() data: any, @Ctx() ctx: RmqContext) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.categoriesService.delete(data.id);
  }
}
