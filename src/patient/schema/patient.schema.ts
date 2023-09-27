import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PatientDocument = HydratedDocument<Patient>;

/* 
The HydratedDocument type is typically used to represent documents retrieved from a MongoDB collection 
when using Mongoose. It extends or represents a MongoDB document with additional Mongoose-specific
features and methods.
*/

enum maritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
}

@Schema()
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: maritalStatus })
  maritalStatus: string;

  @Prop({ required: true })
  numberOfFamilyMembers: number;

  @Prop()
  medicalRecord: string;

  @Prop({ required: true })
  chronicDiseases: string;

  @Prop({ required: true, default: 0 })
  numberOfPaidScouts: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'doctors' }] })
  myDoctors: Types.ObjectId[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
