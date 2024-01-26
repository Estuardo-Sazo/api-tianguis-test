import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteProfile } from '../entities/favoriteProfile.entity';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { CreateFavoriteProfileDto } from '../dtos/favoriteProfile.dto';

@Injectable()
export class FavoriteProfileService {
  constructor(
    @InjectRepository(FavoriteProfile)
    private favoriteProfileRepository: Repository<FavoriteProfile>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  async createFavoriteProfile(
    createFavoriteProfileDto: CreateFavoriteProfileDto,
    author: Profile,
  ) {
    const { profileId } = createFavoriteProfileDto;
    const favoriteProfile = new FavoriteProfile();
    favoriteProfile.author = author;

    const existingFavorite = await this.favoriteProfileRepository.findOne({
      where: {
        author: { id: author.id },
        profile: { id: profileId },
      },
    });

    if (existingFavorite) {
      throw new ConflictException('Este favorito ya ha sido registrado.');
    }

    if (profileId) {
      const profile = await this.profileRepo.findOne({
        where: {
          id: profileId,
        },
      });
      if (!profile) {
        throw new NotFoundException('Perfil no encontrado');
      }
      favoriteProfile.profile = profile;
    }

    return await this.favoriteProfileRepository.save(favoriteProfile);
  }

  async removeFavoriteProfile(profileId: number, authorId: number) {
    const favoriteProfile = await this.favoriteProfileRepository.findOne({
      where: {
        author: { id: authorId },
        profile: { id: profileId },
      },
    });

    if (!favoriteProfile) {
      throw new NotFoundException('Este favorito no existe');
    }
    return await this.favoriteProfileRepository.remove(favoriteProfile);
  }

  async getFavoriteProfilesByProfile(id: number) {
    return await this.favoriteProfileRepository.find({
      where: { author: { id: id } },
      relations: ['profile'],
    });
  }
}
