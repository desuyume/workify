import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { IUserPayload } from '@workify/shared';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@/config/multer.config';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const { id } = req.user as IUserPayload;
    return await this.usersService.findById(id);
  }

  @Get('profile/:login')
  async getProfileByLogin(@Param('login') login: string) {
    return await this.usersService.findByLogin(login);
  }

  @UseGuards(JwtGuard)
  @Patch('avatar')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async updateAvatar(@Req() req, @UploadedFile() avatar: Express.Multer.File) {
    const { id } = req.user as IUserPayload;
    return await this.usersService.updateAvatar(id, avatar);
  }

  @UseGuards(JwtGuard)
  @Delete('avatar')
  async deleteAvatar(@Req() req) {
    const { id } = req.user as IUserPayload;
    return await this.usersService.deleteAvatar(id);
  }

  @UseGuards(JwtGuard)
  @Patch('name')
  async updateName(@Req() req, @Body() dto: { name: string }) {
    const { id } = req.user as IUserPayload;
    return await this.usersService.updateName(id, dto.name);
  }

  @UseGuards(JwtGuard)
  @Patch('birthday')
  async updateBirthday(@Req() req, @Body() dto: { birthday: Date | null }) {
    const { id } = req.user as IUserPayload;
    return await this.usersService.updateBirthday(id, dto.birthday);
  }

  @UseGuards(JwtGuard)
  @Patch('specialisation')
  async updateSpecialisation(
    @Req() req,
    @Body() dto: { specialisation: string },
  ) {
    const { id } = req.user as IUserPayload;
    return await this.usersService.updateSpecialisation(id, dto.specialisation);
  }

  @UseGuards(JwtGuard)
  @Patch('email')
  async updateEmail(@Req() req, @Body() dto: { email: string }) {
    const { id } = req.user as IUserPayload;
    return await this.usersService.updateEmail(id, dto.email);
  }

  @UseGuards(JwtGuard)
  @Patch('phone')
  async updatePhone(@Req() req, @Body() dto: { phone: string }) {
    const { id } = req.user as IUserPayload;
    return await this.usersService.updatePhone(id, dto.phone);
  }

  @UseGuards(JwtGuard)
  @Patch('description')
  async updateDescription(@Req() req, @Body() dto: { description: string }) {
    const { id } = req.user as IUserPayload;
    return await this.usersService.updateDescription(id, dto.description);
  }

  @UseGuards(JwtGuard)
  @Patch('password')
  async updatePassword(@Req() req, @Body() dto: { password: string }) {
    const { id } = req.user as IUserPayload;
    return await this.usersService.updatePassword(id, dto.password);
  }

  @UseGuards(JwtGuard)
  @Patch('communication/email')
  async updateEmailCommunication(@Req() req, @Body() dto: { isVisible: boolean }) {
    const { id } = req.user as IUserPayload;
    return await this.usersService.updateEmailCommunication(id, dto.isVisible);
  }

  @UseGuards(JwtGuard)
  @Patch('communication/phone')
  async updatePhoneCommunication(@Req() req, @Body() dto: { isVisible: boolean }) {
    const { id } = req.user as IUserPayload;
    return await this.usersService.updatePhoneCommunication(id, dto.isVisible);
  }
}
