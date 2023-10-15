import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        password: false,
        name: true,
        avatarPath: true,
        email: true,
      },
    });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }
}
