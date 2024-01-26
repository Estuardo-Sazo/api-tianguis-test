import { Controller, Get } from '@nestjs/common';
import {
  Body,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common/decorators';
import { Public } from 'src/auth/decorators/public.decorator';
import { User } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ParseIntPipe } from 'src/common/parse-int-pipe.pipe';
import { CreateProfileDto, UpdateProfileDto } from '../dtos/profile.dto';
import { ProfilesService } from '../services/profiles.service';
import { Request } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profiles')
export class ProfilesController {
  constructor(private profielService: ProfilesService) {}

  @Public()
  @Get()
  getProfiles() {
    return this.profielService.findAll();
  }

  @Public()
  @Get(':profile')
  getProfile(@Param('profile', ParseIntPipe) profileId: number) {
    return this.profielService.findOne(profileId);
  }

  @Public()
  @Post()
  createProfile(@Body() payload: CreateProfileDto) {
    return this.profielService.create(payload);
  }

  @Put()
  update(@Body() payload: UpdateProfileDto, @Req() req: Request) {
    const user = req.user as User;
    const id = user.profile.id;
    console.log(payload);

    return this.profielService.update(id, payload);
  }
}
