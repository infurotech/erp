import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../services/user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './const';
import { LocalStrategy } from './local.staregy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService, 
    LocalStrategy
  ],
  controllers: [
    AuthController
  ],
})
export class AuthModule { }
