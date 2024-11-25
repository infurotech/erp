import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id };
    return {
      data : {
        token: await this.jwtService.signAsync(payload),
        name: user.firstName,
        avatar: user.profileUrl
      }
    };
  }
}