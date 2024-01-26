import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/categoty.dto';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('/list')
  findAllCategory(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.categoriesService.findAllCategory(page, pageSize);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }
}
