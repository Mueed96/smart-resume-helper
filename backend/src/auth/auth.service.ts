import { ConflictException, Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: AuthDto) {
    const { email, password, name } = dto;

    if (!name) {
      throw new BadRequestException('Name is required for signup.');
    }

    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw new ConflictException('Email already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async login(dto: AuthDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // --- THIS IS THE FIX: Added user.createdAt to the payload ---
    const payload = { sub: user.id, email: user.email, name: user.name, createdAt: user.createdAt };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    const { name } = dto;

    if (!name || name.trim() === '') {
      throw new BadRequestException('Name cannot be empty.');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { name },
    });

    if (!updatedUser) {
      throw new NotFoundException('User not found.');
    }

    const payload = { sub: updatedUser.id, email: updatedUser.email, name: updatedUser.name, createdAt: updatedUser.createdAt };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}