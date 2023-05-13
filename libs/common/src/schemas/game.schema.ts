import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { AbstractIdDocumentSchema } from '@app/common/repositories';
import { IResultGame } from '@app/common/interfaces';

@Schema({ versionKey: false, timestamps: true, collection: 'games' })
export class Game extends AbstractIdDocumentSchema {
  @Prop()
  category: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Player' }],
  })
  players: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Player' })
  winnerPlayerId: string;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: Challenge.name })
  // challenge: string;

  @Prop()
  result: IResultGame[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
