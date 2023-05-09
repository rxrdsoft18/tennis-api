import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from 'mongoose';
import { Player } from '../../players/schema/player.schema';

@Schema({ versionKey: false, timestamps: true, collection: 'games' })
export class Game {
  @Prop()
  category: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: Player.name }],
  })
  players: string[];

  @Prop()
  result: [];
}

export const GameSchema = SchemaFactory.createForClass(Game);
