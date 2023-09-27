import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from './schema/doctor.schema';
import {
  Category,
  CategorySchema,
} from 'src/categories/schema/category.schema';
import { DoctorsController } from './doctors.controller';
import { Booking, BookingSchema } from 'src/booking/schema/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doctor.name, schema: DoctorSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Booking.name, schema: BookingSchema },
    ]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
