import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorsModule } from './doctors/doctors.module';
import { BookingModule } from './booking/booking.module';
import { PatientModule } from './patient/patient.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/Doctor-Project'),
    AuthModule,
    CategoriesModule,
    DoctorsModule,
    BookingModule,
    PatientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
