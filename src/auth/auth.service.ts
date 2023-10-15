import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AccessTokenDto, AuthDto } from './auth.dto';
import { BadRequestException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { hash } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  // Registration
  async register(authData: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: authData.email,
      },
    });

    if (oldUser) throw new BadRequestException('User already exists!');

    const userAvatar = authData.avatarPath || faker.image.avatar();

    const user = await this.prisma.user.create({
      data: {
        email: authData.email,
        name: authData.name,
        password: await hash(authData.password),
        avatarPath: userAvatar,
      },
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async login(loginData: AuthDto) {
    const user = await this.validateUser(loginData);

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async getTokens({ refreshToken }: AccessTokenDto) {
    const verifyResult = await this.jwt.verifyAsync(refreshToken);
    if (!verifyResult) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.prisma.user.findUnique({
      where: {
        id: verifyResult.id,
      },
    });

    const tokens = await this.issueTokens(user.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private async validateUser(userData: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, userData.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  private async issueTokens(userId: number) {
    const data = { id: userId };
    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
