import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

import { CrudService, DatabaseService } from "@infuro/shared";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable({ scope: Scope.REQUEST })
@Injectable()
export class AuthService extends CrudService<User> {

  constructor(
    @InjectRepository(User) repo,
    databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    super(repo, databaseService);
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.findByUsername(username);
    if (!user || !bcrypt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }
    return {
        token: await this.jwtService.signAsync({ sub: user.id }, { secret: this.configService.get<string>('JWT_SECRET') }),
        user: { name: user.firstName, avatar: user.profileUrl }
    };
  }
  async findByUsername(username: string): Promise<User | null> {
    var user = await this.repo.findOneBy({ email: username });
    return user;
  }
}