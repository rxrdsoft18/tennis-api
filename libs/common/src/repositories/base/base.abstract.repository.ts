import { Logger } from '@nestjs/common';
import { FilterQuery, Model, SaveOptions, Types, UpdateQuery } from 'mongoose';
import { AbstractIdDocumentSchema } from './abstract-id.document.schema';

export abstract class BaseAbstractRepository<
  T extends AbstractIdDocumentSchema,
> {
  protected abstract readonly logger: Logger;

  protected constructor(protected readonly model: Model<T>) {}

  async create(document: Omit<T, '_id'>, options?: SaveOptions): Promise<T> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save(options)).toJSON() as unknown as T;
  }

  findOne(filterQuery: FilterQuery<T>) {
    return this.model.findOne(filterQuery, {}, { lean: true });
  }

  async findOneAndUpdate(filterQuery: FilterQuery<T>, update: UpdateQuery<T>) {
    return this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });
  }

  async upsert(filterQuery: FilterQuery<T>, document: Partial<T>) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  find(filterQuery: FilterQuery<T>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }
}
