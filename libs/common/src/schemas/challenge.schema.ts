import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Game } from '@app/common';
import { AbstractIdDocumentSchema } from '@app/common/repositories';
@Schema({ versionKey: false, timestamps: true, collection: 'challenges' })
export class Challenge extends AbstractIdDocumentSchema {
  @Prop()
  dateAndTime: Date;

  @Prop()
  status: string;

  @Prop()
  dateAndTimeResponse: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Player' })
  requestPlayer: string;

  @Prop()
  category: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Player' }],
  })
  players: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Game' })
  game: Game;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
