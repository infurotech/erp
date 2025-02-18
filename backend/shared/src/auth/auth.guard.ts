import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './public.guard';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private configService: ConfigService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

           // ✅ Check if route is marked as @Public()
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        console.log('isPublic',isPublic);
        if (isPublic) {
            return true; // ✅ Allow access without authentication
        }

        
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
          throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET') || 'secret007',
            });
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