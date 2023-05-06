import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractIdDocumentSchema } from '../../common/repositories/abstract-id.document.schema';
@Schema({ versionKey: false, collection: 'players' })
export class Player extends AbstractIdDocumentSchema {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
