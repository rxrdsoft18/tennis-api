import { Prop, Schema } from '@nestjs/mongoose';
import { Types, SchemaTypes } from 'mongoose';

@Schema()
export class AbstractIdDocumentSchema {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
