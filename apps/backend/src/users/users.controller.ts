import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { UsersService } from './users.service'
import { JwtGuard } from 'src/auth/guards/jwt.guard'
import { IUserPayload } from '@workify/shared'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from '@/common/config/multer.config'
import { CurrentUser } from '@/common/decorators/user.decorator'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: IUserPayload) {
    return await this.usersService.findById(user.id)
  }

  @Get('profile/:login')
  async getProfileByLogin(@Param('login') login: string) {
    return await this.usersService.findByLogin(login)
  }

  @UseGuards(JwtGuard)
  @Patch('avatar')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async updateAvatar(
    @CurrentUser() user: IUserPayload,
    @UploadedFile() avatar: Express.Multer.File
  ) {
    return await this.usersService.updateAvatar(user.id, avatar)
  }

  @UseGuards(JwtGuard)
  @Delete('avatar')
  async deleteAvatar(@CurrentUser() user: IUserPayload) {
    return await this.usersService.deleteAvatar(user.id)
  }

  @UseGuards(JwtGuard)
  @Patch('name')
  async updateName(@CurrentUser() user: IUserPayload, @Body() dto: { name: string }) {
    return await this.usersService.updateName(user.id, dto.name)
  }

  @UseGuards(JwtGuard)
  @Patch('birthday')
  async updateBirthday(@CurrentUser() user: IUserPayload, @Body() dto: { birthday: Date | null }) {
    return await this.usersService.updateBirthday(user.id, dto.birthday)
  }

  @UseGuards(JwtGuard)
  @Patch('specialisation')
  async updateSpecialisation(
    @CurrentUser() user: IUserPayload,
    @Body() dto: { specialisation: string }
  ) {
    return await this.usersService.updateSpecialisation(user.id, dto.specialisation)
  }

  @UseGuards(JwtGuard)
  @Patch('email')
  async updateEmail(@CurrentUser() user: IUserPayload, @Body() dto: { email: string }) {
    return await this.usersService.updateEmail(user.id, dto.email)
  }

  @UseGuards(JwtGuard)
  @Patch('phone')
  async updatePhone(@CurrentUser() user: IUserPayload, @Body() dto: { phone: string }) {
    return await this.usersService.updatePhone(user.id, dto.phone)
  }

  @UseGuards(JwtGuard)
  @Patch('description')
  async updateDescription(@CurrentUser() user: IUserPayload, @Body() dto: { description: string }) {
    return await this.usersService.updateDescription(user.id, dto.description)
  }

  @UseGuards(JwtGuard)
  @Patch('password')
  async updatePassword(@CurrentUser() user: IUserPayload, @Body() dto: { password: string }) {
    return await this.usersService.updatePassword(user.id, dto.password)
  }

  @UseGuards(JwtGuard)
  @Patch('communication/email')
  async updateEmailCommunication(
    @CurrentUser() user: IUserPayload,
    @Body() dto: { isVisible: boolean }
  ) {
    return await this.usersService.updateEmailCommunication(user.id, dto.isVisible)
  }

  @UseGuards(JwtGuard)
  @Patch('communication/phone')
  async updatePhoneCommunication(
    @CurrentUser() user: IUserPayload,
    @Body() dto: { isVisible: boolean }
  ) {
    return await this.usersService.updatePhoneCommunication(user.id, dto.isVisible)
  }
}
