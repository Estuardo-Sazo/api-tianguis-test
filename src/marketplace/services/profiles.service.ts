import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto, UpdateProfileDto } from '../dtos/profile.dto';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  findAll() {
    return this.profileRepo.find();
  }

  async findOne(id: number) {
    const profile = await this.profileRepo.findOne({
      where: { id: id },
      relations: ['products', 'reviews', 'reviews.author'],
    });
    if (!profile) throw new NotFoundException(`Profile #${id} not found`);

    return profile;
  }

  async updateRatingProfile(id: number) {
    const profile = await this.profileRepo.findOne({
      where: { id: id },
      relations: ['reviews'],
    });
    if (!profile) throw new NotFoundException(`Profile #${id} not found`);

    if (profile.reviews) {
      const ratings = profile.reviews.map((review) => review.rating);

      const averageRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b) / ratings.length
          : 0;

      profile.rating = averageRating;

      await this.profileRepo.save(profile);
    }
  }

  async create(data: CreateProfileDto) {
    const newProfile = this.profileRepo.create(data);

    return this.profileRepo.save(newProfile);
  }

  async update(id: number, chanches: UpdateProfileDto) {
    const profile = await this.profileRepo.findOne({
      where: { id: id },
    });
    if (!profile) throw new NotFoundException(`Profile #${id} not found`);
    this.profileRepo.merge(profile, chanches);
    return this.profileRepo.save(profile);
  }
}
