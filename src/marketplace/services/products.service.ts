import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['categories', 'profile'],
      order: {
        id: 'DESC',
      },
      where: {
        activated: true,
      },
    });
  }

  findByCategory(id) {
    return this.productRepo.find({
      order: {
        id: 'DESC',
      },
      where: {
        categories: {
          id: id,
        },
        activated: true,
      },
      relations: ['categories', 'profile'],
    });
  }

  async findAllPage(page = 1, pageSize = 5) {
    const skip = (page - 1) * pageSize;

    const [products, total] = await this.productRepo.findAndCount({
      relations: ['categories', 'profile'],
      order: {
        id: 'DESC',
      },
      where: {
        activated: true,
      },
      skip,
      take: pageSize,
    });

    return {
      products,
      totalItems: total,
      currentPage: page,
      pageSize,
    };
  }

  finOffer() {
    return this.productRepo.find({
      relations: ['categories', 'profile'],
      where: {
        oldPrice: MoreThan(0),
        activated: true,
      },
    });
  }

  async inOffer(): Promise<Product[]> {
    const options: FindManyOptions<Product> = {
      relations: ['categories', 'profile'],
      where: {
        oldPrice: MoreThan(0),
        activated: true,
      },
      order: {
        rating: 'DESC',
      },
      take: 5,
    };
    return this.productRepo.find(options);
  }
  finRecommended() {
    return this.productRepo.find({
      relations: ['categories', 'profile'],
      where: {
        activated: true,
      },
      order: {
        rating: 'DESC',
      },
      skip: 1,
      take: 5,
    });
  }

  async findById(id) {
    const product = await this.productRepo.findOne({
      where: { id: id, activated: true },
      relations: ['profile', 'categories', 'reviews'],
    });

    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  async updateRatingProduct(id: string) {
    const product = await this.productRepo.findOne({
      where: { id: id, activated: true },
      relations: ['reviews'],
    });

    if (!product) throw new NotFoundException(`Product #${id} not found`);

    if (product.reviews) {
      const ratings = product.reviews.map((review) => review.rating);

      const averageRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b) / ratings.length
          : 0;

      product.rating = averageRating;

      await this.productRepo.save(product);
    }
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);

    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(data.categoriesIds);
      newProduct.categories = categories;
    }

    if (data.profileId) {
      const profile = await this.profileRepo.findOne({
        where: {
          id: data.profileId,
        },
      });
      if (!profile)
        throw new NotFoundException(`Profile #${data.profileId} not found`);

      newProduct.profile = profile;
    } else throw new NotFoundException(`Profile #${data.profileId} not found`);

    return this.productRepo.save(newProduct);
  }

  async update(id, changes: UpdateProductDto) {
    const product = await this.productRepo.findOneBy({ id: id });
    if (!product) throw new NotFoundException(`Product #${id} not found`);

    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findByIds(
        changes.categoriesIds,
      );
      product.categories = categories;
    }

    if (changes.profileId) {
      const profile = await this.profileRepo.findOne({
        where: {
          id: changes.profileId,
        },
      });
      if (!profile)
        throw new NotFoundException(`Profile #${changes.profileId} not found`);
    }

    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }
}
