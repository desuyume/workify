import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { hash } from 'bcrypt';
import {
  CUSTOM_PRISMA_SERVICE,
  CUSTOM_PRISMA_TYPE,
} from 'src/constants/prisma.constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CUSTOM_PRISMA_SERVICE)
    private prisma: CUSTOM_PRISMA_TYPE,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.client.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user) throw new ConflictException('User already exists');

    if (dto.password !== dto.rePassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const newUser = await this.prisma.client.user.create({
      data: {
        name: dto.login,
        email: dto.email,
        password: await hash(dto.password, 10),
      },
    });

    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.client.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    const user = await this.prisma.client.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
