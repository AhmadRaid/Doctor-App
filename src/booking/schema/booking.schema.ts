import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Doctor } from 'src/doctors/schema/doctor.schema';
import { Patient } from 'src/patient/schema/patient.schema';

export type BookingDocument = HydratedDocument<Booking>;

/* 
The HydratedDocument type is typically used to represent documents retrieved from a MongoDB collection 
when using Mongoose. It extends or represents a MongoDB document with additional Mongoose-specific
features and methods.
*/

enum StatusBooking {
  ACTIVE = 'Active',
  CANCELED = 'Canceled',
}

enum TypeBooking {
  NEW_BOOKING = 'New_Booking',
  REVIEW = 'Review',
}

@Schema()
export class Booking {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctors',
    required: true,
  })
  doctor: Doctor; //This is the actual property definition. It declares a property named "doctor" with the TypeScript type Doctor

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patients',
    required: true,
  })
  patient: Patient; //This is the actual property definition. It declares a property named "patient" with the TypeScript type Patient

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true, enum: StatusBooking })
  status: string;

  @Prop({ required: true, enum: TypeBooking })
  type: string;

  @Prop({ required: true, default: false })
  paid: boolean;

  @Prop({ required: true, default: false })
  price: number;
}

const BookingSchema: mongoose.Schema = SchemaFactory.createForClass(Booking);

BookingSchema.index({ doctorId: 1, time: 1, date: 1 }, { unique: true });

export { BookingSchema };
