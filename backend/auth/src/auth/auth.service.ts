import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService extends TypeOrmCrudService<User>{
  constructor(
    @InjectRepository(User) repo,
    private jwtService: JwtService
  ) {
    super(repo);
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.findByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    return {
      data : {
        token: await this.jwtService.signAsync({ sub: user.id }),
        name: user.firstName,
        avatar: user.profileUrl
      }
    };
  }
  async findByUsername(username: string): Promise<User | null> {
    var user = await this.repo.findOneBy({ email: username });
    return user;
  }
}