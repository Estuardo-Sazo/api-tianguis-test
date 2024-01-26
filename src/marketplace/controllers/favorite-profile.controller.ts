import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavoriteProfileService } from '../services/favorite-profile.service';
import { CreateFavoriteProfileDto } from '../dtos/favoriteProfile.dto';

import { Request } from 'express';
import { User } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('favorite-profile')
export class FavoriteProfileController {
  constructor(private favProfileSvc: FavoriteProfileService) {}

  @Post()
  async createFavoriteProfile(
    @Body() createFavoriteProfileDto: CreateFavoriteProfileDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    await this.favProfileSvc.createFavoriteProfile(
      createFavoriteProfileDto,
      user.profile,
    );
    return {
      message: 'Perfil agregado a favoritos',
    };
  }

  @Get('profile/:id')
  async getFavoriteProfilesByProfile(@Param('id') id: number) {
    return this.favProfileSvc.getFavoriteProfilesByProfile(id);
  }

  @Post('remove')
  async revomeFavoriteProfile(
    @Body() deleteFavoriteProfileDto: CreateFavoriteProfileDto,
    @Req() req: Request,
  ) {
    const { profileId } = deleteFavoriteProfileDto;
    const user = req.user as User;
    await this.favProfileSvc.removeFavoriteProfile(profileId, user.profile.id);
    return {
      message: 'Perfil eliminado de favoritos',
    };
  }
}
