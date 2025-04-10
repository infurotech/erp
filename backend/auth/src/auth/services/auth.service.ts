import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

import { CrudService, InjectTenantRepository } from "@infuro/shared";
import { DataSource, Repository } from 'typeorm';
import { CONNECTION } from 'src/tenancy/tenancy.module';

@Injectable({ scope: Scope.REQUEST })
@Injectable()
export class AuthService  {
  private userRepository: Repository<User>;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CONNECTION) private readonly connection: DataSource

  ) {
   // console.log("connection",connection);
    this.userRepository = connection.getRepository(User);
  }

  async signIn(username: string, pass: string): Promise<any> {
    console.log("signin called")
    const user = await this.findByUsername(username);
    console.log("user",user);
    if (!user || !bcrypt.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }
    return await this.generateAccessToken(user);
  }

  async loginByRefreshToken(refreshToken: string): Promise<any> {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET') || 'secret007',
      });
      if(!payload) throw new UnauthorizedException();

      const user = await this.findByUsername(payload.userId);
      if (!user) {
        throw new UnauthorizedException();
      }
      return await this.generateAccessToken(user);
  }

  async generateAccessToken(user: any): Promise<any> {
    return {
      token: await this.jwtService.signAsync({ sub: user.id }, { secret: this.configService.get<string>('JWT_SECRET') }),
      user: { name: user.firstName, avatar: user.profileUrl }
    };
  }

  async generateRefreshToken(userId: string): Promise<any> {
    return this.jwtService.sign(
      { userId },
      { secret: this.configService.get<string>('JWT_SECRET') }
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    console.log("findByUsername called with username:", username);
  
    try {
      const user = await this.userRepository.findOneBy({ email: username });
      console.log("Found user:", user);
      return user; 
    } catch (error) {
      console.error("Error occurred while fetching user:", error);
      return null;
    }
  }
  
  async findByUserId(userId: string): Promise<User | null> {
    var user = await this.userRepository.findOneBy({ id: userId });
    return user;
  }
}