import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [CategoriesModule, MongooseModule.forRoot('mongodb://127.0.0.1/Doctor-Project'), DoctorsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
