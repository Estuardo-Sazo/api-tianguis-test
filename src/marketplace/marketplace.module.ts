import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProfilesService } from './services/profiles.service';
import { ProfilesController } from './controllers/profiles.controller';
import { Profile } from './entities/profile.entity';
import { Review } from './entities/review.entity';
import { ReviewsService } from './services/reviews.service';
import { ReviewsController } from './controllers/reviews.controller';
import { FavoriteProduct } from './entities/favoriteProduct.entity';
import { FavoriteProductController } from './controllers/favorite-product.controller';
import { FavoriteProductService } from './services/favorite-product.service';
import { FavoriteProfile } from './entities/favoriteProfile.entity';
import { FavoriteProfileService } from './services/favorite-profile.service';
import { FavoriteProfileController } from './controllers/favorite-profile.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      Profile,
      Review,
      FavoriteProduct,
      FavoriteProfile,
    ]),
  ],
  controllers: [
    CategoriesController,
    ProductsController,
    ProfilesController,
    ReviewsController,
    FavoriteProductController,
    FavoriteProfileController,
  ],
  providers: [
    CategoriesService,
    ProductsService,
    ProfilesService,
    ReviewsService,
    FavoriteProductService,
    FavoriteProfileService,
  ],
  exports: [TypeOrmModule],
})
export class MarketplaceModule {}
