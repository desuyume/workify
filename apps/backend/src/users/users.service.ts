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
import { removeFile } from '@/utils/removeFIle';

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
        login: dto.login,
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
    const user = await this.prisma.client.user.findUnique({
      where: { id },
      select: {
        id: true,
        login: true,
        email: true,
        name: true,
        avatar: true,
        birthday: true,
        description: true,
        phone: true,
        specialisation: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateAvatar(id: number, avatar: Express.Multer.File) {
    const user = await this.findById(id);
    if (user.avatar) {
      removeFile(user.avatar);
    }

    return await this.prisma.client.user.update({
      where: { id },
      data: {
        avatar: avatar.filename,
      },
    });
  }

  async deleteAvatar(id: number) {
    const user = await this.findById(id);
    if (user.avatar) {
      removeFile(user.avatar);
    }
    return await this.prisma.client.user.update({
      where: { id },
      data: {
        avatar: null,
      },
    });
  }

  async updateName(id: number, name: string) {
    return await this.prisma.client.user.update({
      where: { id },
      data: {
        name,
      },
    });
  }

  async updateBirthday(id: number, birthday: Date | null) {
    return await this.prisma.client.user.update({
      where: { id },
      data: {
        birthday,
      },
    });
  }

  async updateSpecialisation(id: number, specialisation: string) {
    return await this.prisma.client.user.update({
      where: { id },
      data: {
        specialisation,
      },
    });
  }

  async updateEmail(id: number, email: string) {
    const user = await this.findByEmail(email);

    if (user)
      throw new ConflictException('Пользователь с таким email уже существует');

    return await this.prisma.client.user.update({
      where: { id },
      data: {
        email,
      },
    });
  }

  async updatePhone(id: number, phone: string) {
    return await this.prisma.client.user.update({
      where: { id },
      data: {
        phone,
      },
    });
  }

  async updateDescription(id: number, description: string) {
    return await this.prisma.client.user.update({
      where: { id },
      data: {
        description,
      },
    });
  }

  async updatePassword(id: number, password: string) {
    return await this.prisma.client.user.update({
      where: { id },
      data: {
        password: await hash(password, 10),
      },
    });
  }
}
