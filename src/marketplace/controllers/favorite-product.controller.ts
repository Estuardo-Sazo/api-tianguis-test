import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { FavoriteProductService } from '../services/favorite-product.service';
import {
  CreateFavoriteProductDto,
  DeleteFavoriteProductDto,
} from '../dtos/favoriteProduct.dto';

import { Request } from 'express';
import { User } from 'src/auth/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('favorite-product')
export class FavoriteProductController {
  constructor(private favProductSvc: FavoriteProductService) {}

  @Post()
  async createFavoriteProduct(
    @Body() createFavoriteProductDto: CreateFavoriteProductDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    await this.favProductSvc.createFavoriteProduct(
      createFavoriteProductDto,
      user.profile,
    );
    return {
      message: 'Producto agregado a favoritos',
    };
  }

  @Get('profile/:id')
  async getFavoriteProductsByProfile(@Param('id') id: number) {
    return this.favProductSvc.getFavoriteProductsByProfile(id);
  }

  @Post('remove')
  async revomeFavoriteProduct(
    @Body() deleteFavoriteProductDto: DeleteFavoriteProductDto,
    @Req() req: Request,
  ) {
    const { productId } = deleteFavoriteProductDto;
    const user = req.user as User;
    await this.favProductSvc.removeFavoriteProduct(user.profile.id, productId);
    return {
      message: 'Producto eliminado de favoritos',
    };
  }
}
