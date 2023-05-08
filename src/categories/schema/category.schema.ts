import { AbstractIdDocumentSchema } from '../../common/repositories/abstract-id.document.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Player } from '../../players/schema/player.schema';
import { EventInterface } from '../interfaces/event.interface';
import { Type } from "class-transformer";

@Schema({ versionKey: false, collection: 'categories', timestamps: true })
export class Category extends AbstractIdDocumentSchema {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  events: EventInterface[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Player' }],
  })
  players: string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
