import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private configService: ConfigService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        //     context.getHandler(),
        //     context.getClass(),
        // ]);
        // if (isPublic) {
        //     // 💡 See this condition
        //     return true;
        // }
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        console.log('token',token);
        if (!token) {
          throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET') || 'secret007',
            });
            console.log('payload',payload);
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['userId'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        var [type, token] = request.headers.authorization?.split(' ') ?? [];
        if(token){
            return type === 'Bearer' ? token : undefined;
        }
        return request.cookies[this.configService.get<string>('JWT_SECRET_TOKEN') || 'session_token'];
    }
}