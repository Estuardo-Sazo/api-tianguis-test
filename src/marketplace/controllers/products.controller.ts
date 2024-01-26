import { Body, Controller, Get, Post } from '@nestjs/common';
import { Param, Put, Query, Req, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ParseIntPipe } from 'src/common/parse-int-pipe.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { ProductsService } from '../services/products.service';
import { Request } from 'express';
import { User } from 'src/auth/entities/user.entity';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Public()
  @Get()
  getProducts() {
    return this.productService.findAll();
  }

  @Public()
  @Get('category/:id')
  getProductsCategory(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findByCategory(id);
  }

  @Public()
  @Get('list')
  getProductspage(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.productService.findAllPage(page, pageSize);
  }

  @Public()
  @Get('offer')
  getProductsOffer() {
    return this.productService.inOffer();
  }

  @Public()
  @Get('recommended')
  getProductsrecommended() {
    return this.productService.finRecommended();
  }

  @Post()
  crate(@Body() payload: CreateProductDto, @Req() req: Request) {
    const user = req.user as User;
    payload.profileId = user.profile.id;
    return this.productService.create(payload);
  }

  @Public()
  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findById(productId);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.productService.update(id, payload);
  }
}
