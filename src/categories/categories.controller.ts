import { CategoriesService } from './categories.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) { }

    @Post()
    create(@Body() category: CreateCategoryDto) {
        return this.categoriesService.create(category)
    }

    @Get()
    getCategories() {
        return this.categoriesService.getCategories()
    }

    @Get(':id')
    showCategory(@Param('id') id: string) {
        return this.categoriesService.showCategory(id)
    }

    @Put(':id')
    updateCategory(@Param('id') id: string, @Body() categoryData: CreateCategoryDto) {
        return this.categoriesService.updateCategory(id, categoryData)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.categoriesService.deleteCategory(id);
    }
}
