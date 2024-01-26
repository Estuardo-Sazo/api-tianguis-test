import { Controller, Post, Body, Req, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCreateDto } from '../dto/user.dto';
import { AuthService } from '../services/auth.service';
import { Request } from 'express';
import { User } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: UserCreateDto) {
    console.log(user);

    return this.authService.create(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }

  @Post('auth-login-email')
  authLoginEmail(@Body() body) {
    const { email } = body;
    return this.authService.authEmail(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user-token')
  getUserToken(@Req() req: Request) {
    const user = req.user as User;
    return user;
  }

  @Post('by-email')
  getByEmail(@Body() body) {
    const { email } = body;
    return this.authService.findByEmail(email);
  }
}
