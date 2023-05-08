import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { GetCategoryDto } from './dtos/get-category.dto';
import { AssignPlayerCategoryDto } from './dtos/assign-player-category.dto';

@Controller('v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findById(@Param() getCategoryDto: GetCategoryDto) {
    return this.categoriesService.findById(getCategoryDto.id);
  }
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':id')
  async update(
    @Body() updateCategoryDto: any,
    @Param() getCategoryDto: GetCategoryDto,
  ) {
    return this.categoriesService.update(getCategoryDto.id, updateCategoryDto);
  }

  @Post(':id/players/:playerId')
  async assignPlayerToCategory(
    @Param() assignPlayerToCategoryDto: AssignPlayerCategoryDto,
  ) {
    return this.categoriesService.assignPlayerToCategory(
      assignPlayerToCategoryDto,
    );
  }

  @Delete(':id')
  async delete(@Param() getCategoryDto: GetCategoryDto) {
    return this.categoriesService.delete(getCategoryDto.id);
  }
}
