import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteProduct } from '../entities/favoriteProduct.entity';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { Product } from '../entities/product.entity';
import { CreateFavoriteProductDto } from '../dtos/favoriteProduct.dto';

@Injectable()
export class FavoriteProductService {
  constructor(
    @InjectRepository(FavoriteProduct)
    private favoriteProductRepository: Repository<FavoriteProduct>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  async createFavoriteProduct(
    createFavoriteDto: CreateFavoriteProductDto,
    author: Profile,
  ) {
    const { productId } = createFavoriteDto;
    const favoriteProduct = new FavoriteProduct();
    favoriteProduct.author = author;

    const existingFavorite = await this.favoriteProductRepository.findOne({
      where: {
        author: { id: author.id },
        product: { id: productId },
      },
    });

    if (existingFavorite) {
      throw new ConflictException('Este favorito ya ha sido registrado.');
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
      favoriteProduct.product = product;
    }

    return await this.favoriteProductRepository.save(favoriteProduct);
  }

  async removeFavoriteProduct(profileId: number, productId: string) {
    const favoriteProduct = await this.favoriteProductRepository.findOne({
      where: {
        author: { id: profileId },
        product: { id: productId },
      },
    });
    if (!favoriteProduct) {
      throw new NotFoundException('Producto no encontrado');
    }
    return await this.favoriteProductRepository.remove(favoriteProduct);
  }

  async getFavoriteProductsByProfile(id: number) {
    return this.favoriteProductRepository.find({
      where: { author: { id } },
      relations: ['product'],
    });
  }
}
