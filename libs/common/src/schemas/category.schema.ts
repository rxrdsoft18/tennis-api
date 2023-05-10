import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { AbstractIdDocumentSchema } from '@app/common/repositories';
import { Player } from './player.schema';
import { IEvent } from '@app/common/interfaces';

@Schema({ versionKey: false, collection: 'categories', timestamps: true })
export class Category extends AbstractIdDocumentSchema {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  events: IEvent[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: Player.name }],
  })
  players: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
