import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Category } from '@app/common/schemas';

@Injectable()
export class CategoriesRepository extends BaseAbstractRepository<Category> {
  protected readonly logger = new Logger(CategoriesRepository.name);
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {
    super(categoryModel);
  }
}
