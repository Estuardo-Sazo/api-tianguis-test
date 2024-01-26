import { Injectable, NotFoundException } from '@nestjs/common';
import { Review } from '../entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { Product } from '../entities/product.entity';
import { CreateReviewDto } from '../dtos/review.dto';
import { ProfilesService } from './profiles.service';
import { ProductsService } from './products.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    private profileSvc: ProfilesService,
    private productSvc: ProductsService,
  ) {}

  async createReview(createReviewDto: CreateReviewDto, author: Profile) {
    const { content, rating, profileId, productId } = createReviewDto;
    const review = new Review();
    review.content = content;
    review.rating = rating;
    review.author = author;

    if (profileId) {
      const profile = await this.profileRepo.findOne({
        where: {
          id: profileId,
        },
      });
      if (!profile) {
        throw new NotFoundException('Perfil no encontrado');
      }
      review.profile = profile;
    }

    if (productId) {
      const product = await this.productRepo.findOne({
        where: {
          id: productId,
        },
      });
      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }
      review.product = product;
    }

    const revi = await this.reviewRepository.save(review);
    if (profileId) {
      await this.profileSvc.updateRatingProfile(profileId);
    }
    if (productId) {
      await this.productSvc.updateRatingProduct(productId);
    }
    return revi;
  }

  async getReviewsByProfile(profileId: number) {
    return this.reviewRepository.find({
      where: { profile: { id: profileId } },
    });
  }

  async getReviewsByProduct(productId: string, page = 1, pageSize = 10) {
    const skip = (page - 1) * pageSize;
    const [reviews, total] = await this.reviewRepository.findAndCount({
      order: {
        id: 'DESC',
      },
      where: {
        activated: true,
        product: { id: productId },
      },
      relations: ['author'],
      skip,
      take: pageSize,
    });
    return {
      reviews,
      totalItems: total,
      currentPage: page,
      pageSize,
    };
  }
}
