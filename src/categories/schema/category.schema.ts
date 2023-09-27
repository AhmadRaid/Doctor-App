import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

/* 
The HydratedDocument type is typically used to represent documents retrieved from a MongoDB collection 
when using Mongoose. It extends or represents a MongoDB document with additional Mongoose-specific
features and methods.
*/

@Schema()
export class Category {
  @Prop({ required: true, default: 0, unique: true })
  name: string;

  @Prop({ required: true })
  numberDoctors: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
