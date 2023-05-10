import { AbstractIdDocumentSchema } from '../../common/repositories/abstract-id.document.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Player } from '../../players/schema/player.schema';
import { ChallengeStatus } from '../challenge-status.enum';
import { Game } from './game.schema';

@Schema({ versionKey: false, timestamps: true, collection: 'challenges' })
export class Challenge extends AbstractIdDocumentSchema {
  @Prop()
  dateAndTime: Date;

  @Prop()
  status: ChallengeStatus;

  @Prop()
  dateAndTimeResponse: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Player.name })
  requestPlayer: string;

  @Prop()
  category: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: Player.name }],
  })
  players: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Game.name })
  game: Game;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
