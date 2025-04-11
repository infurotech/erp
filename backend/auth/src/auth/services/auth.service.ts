import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
// import { User } from '../entities/user.entity';
import { CrudService,CONNECTION ,DataSource, Repository,User } from '@infuro/shared'; // Path to your CrudService

@Injectable({ scope: Scope.REQUEST })
export class AuthService extends CrudService<User> {
  constructor( 
    @Inject(CONNECTION) connection: DataSource,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { 
    super(connection.getRepository(User));
  }  

async signIn(username: string, pass: string): Promise<any> {
  const user = await this.findByUsername(username);
  if (!user || !(await bcrypt.compare(pass, user.password))) {
    throw new UnauthorizedException();
  }
  return this.generateAccessToken(user);
}

async findByUsername(username: string): Promise<User | null> {
  return this.repo.findOneBy({ email: username });
}

async generateAccessToken(user: User) {
  return {
    token: await this.jwtService.signAsync({ sub: user.id }),
    user: { name: user.firstName, avatar: user.profileUrl },
  };
}

async generateRefreshToken(userId: string) {
  return this.jwtService.sign({ userId });
}

async loginByRefreshToken(refreshToken: string): Promise<any> {
  const payload = await this.jwtService.verifyAsync(refreshToken, {
    secret: this.configService.get<string>('JWT_SECRET') || 'secret007',
  });
  const user = await this.findByUsername(payload.userId);
  if (!user) throw new UnauthorizedException();
  return await this.generateAccessToken(user);
}
}
