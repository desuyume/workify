import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common'
import { CreateUserDto } from './dto/users.dto'
import { hash } from 'bcryptjs'
import { StorageService } from '@/storage/storage.service'
import { getFileName, getFileUrl } from '@/common/utils/storage'
import { DatabaseClient, eq, users } from '@workify/database'
import { DB_CLIENT } from '@/database/database.module'

@Injectable()
export class UsersService {
  constructor(
    @Inject(DB_CLIENT) private db: DatabaseClient,
    private storageService: StorageService
  ) {}

  async findById(id: number) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        vacancies: true
      }
    })
    if (!user) throw new UnauthorizedException('Пользователь не найден')
    return user
  }

  async findByEmail(email: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.email, email),
      with: {
        vacancies: true
      }
    })
    return user
  }

  async findByLogin(login: string) {
    const user = await this.db.query.users.findFirst({
      where: eq(users.login, login),
      with: {
        vacancies: true
      }
    })
    return user
  }

  async create(dto: CreateUserDto) {
    const userByEmail = await this.findByEmail(dto.email)
    if (userByEmail) throw new ConflictException('Пользователь с такой почтой уже существует')

    const userByLogin = await this.findByLogin(dto.login)
    if (userByLogin) throw new ConflictException('Пользователь с таким логином уже существует')

    if (dto.password !== dto.rePassword) {
      throw new BadRequestException('Пароли не совпадают')
    }

    const [newUser] = await this.db
      .insert(users)
      .values({
        login: dto.login,
        email: dto.email,
        password: await hash(dto.password, 10)
      })
      .returning()

    if (!newUser) {
      throw new BadRequestException('Не удалость создать пользователя')
    }

    const { password: _, ...result } = newUser
    return result
  }

  async updateAvatar(id: number, avatar: Express.Multer.File) {
    const user = await this.findById(id)
    if (user.avatar) {
      await this.storageService.delete(getFileName(user.avatar))
    }

    const storageResponse = await this.storageService.upload(avatar)
    if (storageResponse.$metadata.httpStatusCode !== 200) {
      throw new InternalServerErrorException('Failed to uploading file to S3')
    }

    const [updatedUser] = await this.db
      .update(users)
      .set({
        avatar: getFileUrl(storageResponse.fileName)
      })
      .where(eq(users.id, id))
      .returning()
    return updatedUser
  }

  async deleteAvatar(id: number) {
    const user = await this.findById(id)
    if (user.avatar) {
      await this.storageService.delete(getFileName(user.avatar))
    }

    const [deletedUser] = await this.db.delete(users).where(eq(users.id, id)).returning()
    return deletedUser
  }

  async updateName(id: number, name: string) {
    const [updatedUser] = await this.db
      .update(users)
      .set({
        name
      })
      .where(eq(users.id, id))
      .returning()
    return updatedUser
  }

  async updateBirthday(id: number, birthday: Date | null) {
    const [updatedUser] = await this.db
      .update(users)
      .set({
        birthday: String(birthday)
      })
      .where(eq(users.id, id))
      .returning()
    return updatedUser
  }

  async updateSpecialisation(id: number, specialisation: string) {
    const [updatedUser] = await this.db
      .update(users)
      .set({
        specialisation
      })
      .where(eq(users.id, id))
      .returning()
    return updatedUser
  }

  async updateEmail(id: number, email: string) {
    const user = await this.findByEmail(email)
    if (user) throw new ConflictException('Пользователь с таким email уже существует')

    const [updatedUser] = await this.db
      .update(users)
      .set({
        email
      })
      .where(eq(users.id, id))
      .returning()
    return updatedUser
  }

  async updatePhone(id: number, phone: string) {
    const [updatedUser] = await this.db
      .update(users)
      .set({
        phone
      })
      .where(eq(users.id, id))
      .returning()
    return updatedUser
  }

  async updateDescription(id: number, description: string) {
    const [updatedUser] = await this.db
      .update(users)
      .set({
        description
      })
      .where(eq(users.id, id))
      .returning()
    return updatedUser
  }

  async updatePassword(id: number, password: string) {
    const [updatedUser] = await this.db
      .update(users)
      .set({
        password: await hash(password, 10)
      })
      .where(eq(users.id, id))
      .returning()
    return updatedUser
  }

  async updateEmailCommunication(id: number, isVisible: boolean) {
    const [updatedUser] = await this.db
      .update(users)
      .set({
        isEmailVisible: isVisible
      })
      .where(eq(users.id, id))
      .returning()
    return updatedUser
  }

  async updatePhoneCommunication(id: number, isVisible: boolean) {
    const [updatedUser] = await this.db
      .update(users)
      .set({
        isPhoneVisible: isVisible
      })
      .where(eq(users.id, id))
      .returning()
    return updatedUser
  }
}
