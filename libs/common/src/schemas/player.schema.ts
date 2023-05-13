import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractIdDocumentSchema } from '@app/common/repositories';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ versionKey: false, collection: 'players', timestamps: true })
export class Player extends AbstractIdDocumentSchema {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ required: false })
  ranking: string;

  @Prop({ required: false })
  positionRanking: number;

  @Prop({ required: false })
  urlPhoto: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
