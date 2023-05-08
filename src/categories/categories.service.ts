import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoriesRepository } from './categories.repository';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAll() {
    return this.categoriesRepository.find({});
  }

  async findByName(name: string) {
    return this.categoriesRepository.findOne({
      name,
    });
  }

  async findById(id: string) {
    const category = await this.categoriesRepository.findOne({ _id: id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.findByName(createCategoryDto.name);

    if (category) {
      throw new ConflictException('Category already exists');
    }
    return this.categoriesRepository.create(createCategoryDto);
  }

  async update(id: string, updateCategoryDto: Partial<UpdateCategoryDto>) {
    await this.findById(id);
    return this.categoriesRepository.findOneAndUpdate(
      {
        _id: id,
      },
      updateCategoryDto,
    );
  }

  async delete(id: string) {
    await this.findById(id);
    return this.categoriesRepository.findOneAndDelete({ _id: id });
  }
}
