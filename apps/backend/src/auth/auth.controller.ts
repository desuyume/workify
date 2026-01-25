import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/users/dto/users.dto'
import { UsersService } from 'src/users/users.service'
import { LoginDto } from './dto/auth.dto'
import { RefreshJwtGuard } from './guards/refresh.guard'
import { CurrentUser } from '@/common/decorators/user.decorator'
import { IUserPayload } from '@workify/shared'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto)
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto)
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@CurrentUser() user: IUserPayload) {
    return await this.authService.refreshToken(user)
  }
}
