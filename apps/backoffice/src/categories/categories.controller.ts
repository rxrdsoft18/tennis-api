import { Controller, Logger } from '@nestjs/common';
import {
  AssignPlayerCategoryDto,
  CreateCategoryDto,
  GetCategoryDto,
  RabbitmqService,
  UpdateCategoryDto,
} from '@app/common';
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
  async handleCategory(
    @Payload() data: GetCategoryDto,
    @Ctx() ctx: RmqContext,
  ) {
    console.log(data, ' find by id');
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.categoriesService.findById(data.id);
  }

  @MessagePattern('create-category')
  async handleCreateCategory(
    @Payload() data: CreateCategoryDto,
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.categoriesService.create(data);
  }

  @MessagePattern('update-category')
  async handleUpdateCategory(
    @Payload() data: { id: string; category: UpdateCategoryDto },
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.categoriesService.update(data.id, data.category);
  }

  @MessagePattern('assign-player-category')
  async handleAssignPlayerCategory(
    @Payload() data: AssignPlayerCategoryDto,
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.categoriesService.assignPlayerToCategory(data);
  }

  @MessagePattern('get-category-player')
  async handleCategoryPlayer(
    @Payload() data: { id: string },
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.categoriesService.categoryByPlayerId(data.id);
  }

  @MessagePattern('delete-category')
  async handleDeleteCategory(
    @Payload() data: GetCategoryDto,
    @Ctx() ctx: RmqContext,
  ) {
    this.rabbitmqService.acknowledgeMessage(ctx);
    return this.categoriesService.delete(data.id);
  }
}
