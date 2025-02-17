import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Res, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,private configService: ConfigService) {
    }

    @Post('login')
    async login(@Body() signInDto: Record<string, any>, @Res() res: Response) {
        const response = await this.authService.signIn(signInDto.email, signInDto.password);
        console.log(response);

        // Set HTTP-Only Cookie
        res.cookie(this.configService.get<string>('JWT_SECRET_TOKEN') || 'session_token', response.token, {
            //httpOnly: true,  // Prevent XSS attacks
            secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
            sameSite: 'strict',
            maxAge: parseFloat(this.configService.get<string>('JWT_SECRET_AGE') || '0') , // 7 days expiration
        });

        // Return user data
        return res.json({ message: 'Login successful!', user: response.user });
    }

    @Post('logout')
    async logout(@Res() res: Response, @Req() req: Request) {
        res.clearCookie(this.configService.get<string>('JWT_SECRET_TOKEN') || 'session_token');
        return res.json({ message: 'Logged out successfully' });
    }
}