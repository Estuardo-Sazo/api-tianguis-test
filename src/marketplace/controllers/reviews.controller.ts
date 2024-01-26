import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';
import { CreateReviewDto } from '../dtos/review.dto';
import { Param, Req, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Request } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Post()
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.reviewService.createReview(createReviewDto, user.profile);
  }

  @Public()
  @Get('profile/:id')
  async getReviewsByProfile(@Param('id') id: number) {
    return this.reviewService.getReviewsByProfile(id);
  }

  @Public()
  @Get('product/:id')
  async getReviewsByProduct(@Param('id') id: string) {
    return this.reviewService.getReviewsByProduct(id);
  }
}
