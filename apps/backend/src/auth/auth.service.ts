import { IUserPayload } from '@workify/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload: IUserPayload = {
      id: user.id,
      login: user.login,
      email: user.email,
    };

    return {
      user,
      tokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
          secret: process.env.ACCESS_TOKEN_SECRET,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.REFRESH_TOKEN_SECRET,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.username);

    if (!user)
      throw new UnauthorizedException('User with this email not found');

    const isPassEqual = await compare(dto.password, user.password);

    if (user && isPassEqual) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Wrong password');
  }

  async refreshToken(user: IUserPayload) {
    const payload: IUserPayload = {
      id: user.id,
      login: user.login,
      email: user.email,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '5h',
        secret: process.env.ACCESS_TOKEN_SECRET,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.REFRESH_TOKEN_SECRET,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
