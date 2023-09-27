import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category, CategoryDocument } from './schema/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
// import { ConvertNumber } from 'src/utills/Helpers/indes';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(categoryData: any): Promise<CategoryDocument> {
    const createdCategory = await this.categoryModel.create(categoryData);

    return createdCategory;
  }

  async getCategories(queryCategory: any): Promise<any> {
    const { search, sortBy, offset, sortOrder, limit } = queryCategory;

    const pipeline: any[] = [];
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        },
      });
    }

    pipeline.push(
      { $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } },
      { $limit: limit ? parseInt(limit, 10) : 10 },
      { $skip: offset ? parseInt(offset, 10) : 0 },
    );

    const total = await this.categoryModel.count().exec();

    const data = await this.categoryModel.aggregate(pipeline).exec();

    return {
      total,
      data,
    };
  }

  async showCategory(id: string): Promise<CategoryDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid product ID.');
    }

    const categoty = await this.categoryModel.findById(id);

    if (!categoty) throw new NotFoundException('No category with given ID.');

    return categoty;
  }

  async updateCategory(
    id: string,
    categoryData: Partial<CategoryDocument>,
  ): Promise<CategoryDocument> {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid category ID.');

    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      categoryData,
      {
        new: true,
      },
    );

    if (!updatedCategory)
      throw new NotFoundException('No category with given ID.');

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
