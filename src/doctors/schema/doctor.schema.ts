import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, } from "mongoose";
import { Category } from "src/categories/schema/category.schema";

export type DoctorDocument = HydratedDocument<Doctor>

/* 
The HydratedDocument type is typically used to represent documents retrieved from a MongoDB collection 
when using Mongoose. It extends or represents a MongoDB document with additional Mongoose-specific
features and methods.
*/

@Schema({ timestamps: true })
export class Doctor {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true })
    category: Category; //This is the actual property definition. It declares a property named "category" with the TypeScript type Category

    @Prop({ required: true })
    medicalSpecialty: string;

    @Prop({ required: true })
    Certificates: string;

    @Prop({ required: true, default: 0 })
    rating: number;

    @Prop({ required: true })
    bookingPrice: string;

    @Prop({ default: 0 })
    discount: number;

    @Prop({ default: false })
    isDeleted: boolean;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor)