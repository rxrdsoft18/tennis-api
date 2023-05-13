import { AbstractIdDocumentSchema } from '@app/common/repositories';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ versionKey: false, timestamps: true, collection: 'rankings' })
export class Ranking extends AbstractIdDocumentSchema {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Challenge' })
  challenge: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Player' })
  player: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Game' })
  game: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category: string;

  @Prop()
  event: string;

  @Prop()
  operation: string;

  @Prop()
  points: number;
}

export const RankingSchema = SchemaFactory.createForClass(Ranking);
