import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from '../entities/user.host.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
    const payload = { sub: user.id };
    return {
      data : {
        token: await this.jwtService.signAsync(payload),
        name: user.firstName,
        avatar: user.profileUrl
      }
    };
  }

  async 

  async findByUsername(username: string): Promise<User | undefined> {
    var user = await this.repo.findOneBy({ email: username });
    console.log(user);
    return user;
  }
}