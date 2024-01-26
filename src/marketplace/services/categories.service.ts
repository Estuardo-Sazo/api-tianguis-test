import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/categoty.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findAllCategory(page = 1, pageSize = 4) {
    const skip = (page - 1) * pageSize;

    const [categories, total] = await this.categoryRepo
      .createQueryBuilder('category')
      .leftJoin('category.products', 'product')
      .addSelect('COUNT(product.id)', 'productCount')
      .groupBy('category.id')
      .orderBy('productCount', 'DESC')
      .skip(skip)
      .take(pageSize)
      .getManyAndCount();

    return {
      categories,
      totalItems: total,
      currentPage: page,
      pageSize,
    };
  }

  async create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }
}
