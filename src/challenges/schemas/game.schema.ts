import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Player } from '../../players/schema/player.schema';
import { Challenge } from './challenge.schema';
import { AbstractIdDocumentSchema } from '../../common/repositories/abstract-id.document.schema';
import { Result } from '../dtos/assign-challenge-game.dto';

@Schema({ versionKey: false, timestamps: true, collection: 'games' })
export class Game extends AbstractIdDocumentSchema {
  @Prop()
  category: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: Player.name }],
  })
  players: string[];

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: Challenge.name })
  // challenge: string;

  @Prop()
  result: Result[];
}

export const GameSchema = SchemaFactory.createForClass(Game);
