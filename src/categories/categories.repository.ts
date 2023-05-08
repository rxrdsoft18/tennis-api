import { BaseAbstractRepository } from '../common/repositories/base.abstract.repository';
import { Category } from './schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CategoriesRepository extends BaseAbstractRepository<Category> {
  protected readonly logger = new Logger(CategoriesRepository.name);
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {
    super(categoryModel);
  }
}
