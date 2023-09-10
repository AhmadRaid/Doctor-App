import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Category, CategoryDocument } from './schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CategoriesService {

    constructor(@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>) { }


    async create(categoryData: any): Promise<CategoryDocument> {
        const createdCategory = await this.categoryModel.create(categoryData)

        return createdCategory;
    }


    async getCategories(): Promise<CategoryDocument[]> {
        const Categories = await this.categoryModel.find()

        return Categories;
    }


    async showCategory(id): Promise<CategoryDocument> {

        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid product ID.');
        }

        const categoty = await this.categoryModel.findById(id);

        if (!categoty) throw new NotFoundException('No category with given ID.');

        return categoty;
    }


    async updateCategory(id: string, categoryData: Partial<CategoryDocument>): Promise<CategoryDocument> {
        const { name, numberDoctors, description, image } = categoryData

        if (!Types.ObjectId.isValid(id))
            throw new BadRequestException('Invalid category ID.');

        const Category = await this.categoryModel.findById(id);

        if (!Category) throw new NotFoundException('No category with given ID.');

        Category.name = name;
        Category.numberDoctors = numberDoctors;
        Category.description = description;
        Category.image = image;

        const updatedCategory = await Category.save();

        return updatedCategory;

    }

    async deleteCategory(id: string): Promise<void> {
        if (!Types.ObjectId.isValid(id))
            throw new BadRequestException('Invalid category ID.');

        const Category = await this.categoryModel.findById(id);

        if (!Category) throw new NotFoundException('No category with given ID.');

        await Category.deleteOne();
    }
}
