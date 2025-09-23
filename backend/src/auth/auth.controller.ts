import { Controller, Post, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UpdateUserDto } from './dto/update-user.dto'; // Import the new DTO
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  // --- NEW ENDPOINT TO UPDATE USER PROFILE ---
  @UseGuards(JwtAuthGuard)
  @Patch('profile') // Corresponds to PATCH /auth/profile
  updateProfile(
    @Req() req: Request & { user: { sub: string } },
    @Body() dto: UpdateUserDto,
  ) {
    const userId = req.user.sub;
    return this.authService.updateProfile(userId, dto);
  }
}