import { CategoriesService } from './categories.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/CreateCategoryDto.dto';
import { Roles } from 'src/utills/decorators/role.decorator';
import { roleSystemType } from 'src/utills/role/role.enum';
import { PatientGuard } from 'src/utills/role/patient.guard';
//import { DoctorGuard } from 'src/role/doctor.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  create(@Body() category: CreateCategoryDto) {
    return this.categoriesService.create(category);
  }

  //  @Get()
  //  getCategories(
  //    @Query('search') search: string,
  //    @Query('sortBy') sortBy: string,
  //    @Query('offset', ParseIntPipe) offset: number,
  //    @Query('limit', ParseIntPipe) limit: number,
  //  ) {
  //    const queryCategory = { search, sortBy, offset, limit };

  //    return this.categoriesService.getCategories(queryCategory);
  //  }

  @Get()
  @Roles(roleSystemType.Patient)
  @UseGuards(PatientGuard)
  getCategories(@Query() queryCategory: any) {
    return this.categoriesService.getCategories(queryCategory);
  }

  @Get(':id')
  showCategory(@Param('id') id: string) {
    return this.categoriesService.showCategory(id);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() categoryData: CreateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, categoryData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}
