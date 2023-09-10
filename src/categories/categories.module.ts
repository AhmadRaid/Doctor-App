import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { Category, CategorySchema } from './schema/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesService } from './categories.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule { }
