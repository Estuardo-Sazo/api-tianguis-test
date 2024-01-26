import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserCreateDto, UserLoginDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { PayloadToken } from '../models/token.model';
import { Profile } from 'src/marketplace/entities/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}
  async create(user: UserCreateDto) {
    try {
      const newUser = this.userRepo.create(user);

      if (newUser.password) {
        const hashPassword = await bcrypt.hash(newUser.password, 10);
        newUser.password = hashPassword;
      }

      if (!user.profileId)
        throw new NotFoundException(`Profile #${user.profileId} not found`);
      const profile = await this.profileRepo.findOne({
        where: {
          id: user.profileId,
        },
      });

      if (!profile)
        throw new NotFoundException(`Profile #${user.profileId} not found`);

      newUser.profile = profile;

      await this.userRepo.save(newUser);
      return this.generateJWT(newUser);
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email: email },
      relations: ['profile'],
    });
    return user;
  }

  async authEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email: email },
      relations: ['profile'],
    });
    if (!user)
      throw new UnauthorizedException('Error not User by email: ' + email);
    if (user.registrationMethod == 'LOCAL')
      throw new UnauthorizedException(
        'Error Email Not Auth Google or Facebook',
      );
    return this.generateJWT(user);
  }

  async validatUser(user: UserLoginDto) {
    const userEmail = await this.findByEmail(user.email);

    if (!userEmail)
      throw new UnauthorizedException('Error email or password #1');

    const isMatch = await bcrypt.compare(user.password, userEmail.password);
    if (!isMatch) throw new UnauthorizedException('Error email or password #2');
    const { password, ...rpt } = userEmail;

    return rpt;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = {
      role: user.role,
      sub: user.id,
      profile: user.profile.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  private handleDBErrors(error: any): never {
    if (error.code === 'ER_DUP_ENTRY')
      throw new BadRequestException(error.sqlMessage);
    console.log(error.code);
    throw new InternalServerErrorException('Please chech sercver logs');
  }
}
