import { Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CrudService,CONNECTION ,DataSource,User } from '@infuro/shared'; // Path to your CrudService

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
try { const user = await this.findByUsername(username);
  const isPasswordValid = user && await bcrypt.compare(pass, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException();
  }
  return this.generateAccessToken(user);
}catch(error){
  console.log("error",error);
}
}

async findByUsername(username: string): Promise<User | null> {
  return this.repo.findOneBy({ email: username });
}

async generateAccessToken(user: User) {
  try {
     const token = await this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: this.configService.get('JWT_SECRET') || 'secret007',
        expiresIn: '1h'
      }
    );
 
    return {
      token,
      user: { name: user.firstName, avatar: user.profileUrl },
    };
  } catch (error) {
    throw new Error(`Could not generate access token: ${error.message}`);
  }
}

async generateRefreshToken(userId: string) {
  try {
      return this.jwtService.sign(
          { userId },
          {
              secret: process.env.JWT_SECRET || 'secret007',
              expiresIn: '7d'  
          }
      );
  } catch (error) {
      console.error("Error generating refresh token:", error);
      throw new Error("Could not generate refresh token");
  }
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
